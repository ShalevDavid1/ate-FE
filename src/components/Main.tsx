import { AddRestaurantInterface } from "./map/AddRestaurantPopup";
import { toCamelCase } from "../utils/FormatConverter";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import MapComponent from "./map/Map";
import Sidebar from "./bar/SideBar";
import Toast from "./utils/Toast";
import DBAPI from "../api/db";
import { styled } from "@mui/material/styles";

// Layout styled components
const AppContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    width: '100vw',
    background: theme.palette.background.default,
}));
const SidebarContainer = styled('div')(({ theme }) => ({
    flex: '0 0 250px',
    height: '100%',
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    zIndex: 2,
}));
const MapContainerStyled = styled('div')(({ theme }) => ({
    flex: 1,
    height: '100%',
    zIndex: 1,
}));

interface MainProps {
    userInfo: UserInfo;
}

const Main = ({ userInfo }: MainProps) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [friendships, setFriendships] = useState<FriendInfo[]>([]);
    const [friendsRestaurants, setFriendsRestaurants] = useState<FriendRestaurant[]>([]);
    const [selectedFriendsRestaurants, setSelectedFriendsRestaurants] = useState<number[]>([])
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success" as AlertColor,
    });

    useEffect(() => {
        console.log(friendsRestaurants);
    }, [friendsRestaurants])

    const handleAddOrRemoveFriendRestaurant = async (friendInfo: FriendInfo) => {
        if (selectedFriendsRestaurants.includes(friendInfo.id)) {
            // remove
            setFriendsRestaurants((restaurants) => restaurants.filter(restaurant => restaurant.friend.id !== friendInfo.id))
            setSelectedFriendsRestaurants((ids) => ids.filter((id) => id !== friendInfo.id))
        }
        else {
            // add
            try {
                const response = await DBAPI.getRestaurantsById(friendInfo.id)
                const restaurants = toCamelCase(response.data)
                const friendRestaurants = restaurants.map((restaurant: Restaurant) => {
                    return {
                        ...restaurant,
                        friend: friendInfo
                    }
                })
                setFriendsRestaurants((restaurants) => [...restaurants, ...friendRestaurants]);
                setSelectedFriendsRestaurants((ids) => [...ids, friendInfo.id])
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
    }
    const handleToastClose = () => { setToast((prevState) => ({ ...prevState, open: false })); };

    const toastError = (message: string) => { setToast({ open: true, message: message, severity: "error", }); }

    const toastSuccess = (message: string) => { setToast({ open: true, message: message, severity: "success", }); }

    const handleAddRestaurant = async (newRestaurant: AddRestaurantInterface) => {
        const RatedRestaurant = {
            name: newRestaurant.name,
            lat: newRestaurant.location[0],
            lng: newRestaurant.location[1],
            formattedAddress: newRestaurant.formattedAddress,
            rating: {
                foodRating: newRestaurant.foodRating,
                priceRating: newRestaurant.priceRating,
                serviceRating: newRestaurant.serviceRating,
                vibeRating: newRestaurant.vibeRating
            }
        }
        try {
            const response = await DBAPI.AddRatedRestaurant(userInfo.email, RatedRestaurant);
            if (response.status < 200 || response.status >= 300) { throw new Error(`Server Error`); }
            const responseData = await response.data;
            const restaurantAdded = toCamelCase(responseData)
            addRestaurant(restaurantAdded)
            toastSuccess("Restaurant added successfully")
        }
        catch (error: any) {
            console.error(error);
            toastError(error.message)
        }
    }

    const addRestaurant = (restaurant: Restaurant) => {
        setRestaurants((restaurants) => { return [...restaurants, restaurant] })
    }

    const deleteRatedRestaurant = (restaurantId: number) => {
        setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId));
    }

    const handleDeleteRestaurant = async (restaurantId: number) => {
        try {
            const response = await DBAPI.DeleteRatedRestaurant(userInfo.email, restaurantId)

            if (response.status < 200 || response.status >= 300) { throw new Error(`Server Error`); }
            const responseData = await response.data;
            console.log(responseData);
            if (responseData.error) { throw new Error(`Server Error: ${responseData["error"]}`); }
            deleteRatedRestaurant(restaurantId)
            toastSuccess("Restaurant deleted successfully")
        }
        catch (error: any) {
            console.error(error);
            toastError(error.message)
        }
    }

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await DBAPI.getRestaurantsByEmail(userInfo.email)
                setRestaurants(toCamelCase(response.data));
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        const fetchFriendships = async () => {
            try {
                const response = await DBAPI.getFriendships(userInfo.email)
                setFriendships(response.data);
            } catch (error) {
                console.error("Error fetching friendships:", error);
                toastError("Error while fetching friendships")
            }
        };

        fetchFriendships();
        fetchRestaurants();
    }, []);

    console.log(userInfo.email);

    const addFriendship = async (friendship: FriendInfo) => {
        setFriendships(friendships => [...friendships, friendship])
    }

    const handleAddFriendship = async (friendEmail: string) => {
        try {
            const response = await DBAPI.AddFriendship(userInfo.email, friendEmail);
            if (response.status < 200 || response.status >= 300) { throw new Error(`Server Error`); }
            if (response.data.error) { throw new Error(response.data.error as string); }
            console.log(response.data);

            addFriendship(response.data)
        } catch (error: any) {
            if (error.response) {
                // Backend returned an error
                toastError(error.response.data.detail || "An error occurred");
            } else {
                toastError("Unable to connect to the server. Try again later.");
            }
        }
    }

    return (
        <AppContainer>
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleToastClose}
            />
            <SidebarContainer>
                <Sidebar
                    friendships={friendships}
                    selectedFriendsRestaurants={selectedFriendsRestaurants}
                    handleAddOrRemoveFriendRestaurant={handleAddOrRemoveFriendRestaurant}
                    handleAddFriendship={handleAddFriendship}
                />
            </SidebarContainer>
            <MapContainerStyled>
                <MapComponent
                    restaurants={restaurants}
                    friendsRestaurants={friendsRestaurants}
                    handleAddRestaurant={handleAddRestaurant}
                    handleDeleteRestaurant={handleDeleteRestaurant}
                />
            </MapContainerStyled>
        </AppContainer>
    );
};

export default Main;
