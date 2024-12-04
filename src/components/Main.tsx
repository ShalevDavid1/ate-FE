import { AddRestaurantInterface } from "./map/AddRestaurantPopup";
import { toCamelCase } from "../utils/FormatConverter";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import MapComponent from "./map/Map";
import Sidebar from "./bar/SideBar";
import Toast from "./utils/Toast";
import DBAPI from "../api/db";

import "./Main.css"

interface MainProps {
    userInfo: UserInfo;
}

const Main = ({ userInfo }: MainProps) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success" as AlertColor,
    });

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
                const response = await DBAPI.getRestaurants(userInfo.email)
                setRestaurants(toCamelCase(response.data));
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    console.log(userInfo.email);

    return (
        <div className="app-container">
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={handleToastClose}
            />
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="map-container">
                <MapComponent
                    restaurants={restaurants}
                    handleAddRestaurant={handleAddRestaurant}
                    handleDeleteRestaurant={handleDeleteRestaurant}
                />
            </div>
        </div>
    );
};

export default Main;
