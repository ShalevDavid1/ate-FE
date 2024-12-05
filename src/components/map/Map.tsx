import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import AddRestaurantPopup, { AddRestaurantInterface } from "./AddRestaurantPopup";
import L, { DivIcon } from "leaflet";
import { useState } from "react";
import RestaurantCard from "./RestaurantCard";


interface MapComponentProps {
    restaurants: Restaurant[];
    friendsRestaurants: FriendRestaurant[];
    handleAddRestaurant: (new_restaurant: AddRestaurantInterface) => void;
    handleDeleteRestaurant: (restaurantId: number) => void;
}

const MapComponent = ({ restaurants, friendsRestaurants, handleAddRestaurant, handleDeleteRestaurant }: MapComponentProps) => {
    console.log(restaurants);

    const [addRestaurantPopupOpen, setAddRestaurantPopupOpen] = useState(false);
    const [rightClickedLocation, setRightClickedLocation] = useState<[number, number] | null>(null);

    const MapClickHandler = () => {
        useMapEvents({
            contextmenu: (e) => {
                setRightClickedLocation([e.latlng.lat, e.latlng.lng]);
                setAddRestaurantPopupOpen(true);
            },
        });
        return null;
    };

    const calculateAverageRating = (restaurant: RestaurantRating) => {
        const { priceRating, vibeRating, foodRating, serviceRating } = restaurant;
        return ((priceRating + vibeRating + foodRating + serviceRating) / 4);
    };

    const getColorForRating = (rating: number): string => {
        // Linearly interpolate between red and green
        const red = Math.max(0, 255 - Math.round((rating - 1) * 63.75)); // 63.75 = 255 / (5 - 1)
        const green = Math.min(255, Math.round((rating - 1) * 63.75));
        return `rgb(${red}, ${green}, 0)`; // Gradient from red to green
    };

    const createIcon = (averageRating: number): DivIcon => {
        const color = getColorForRating(averageRating)
        return L.divIcon({
            className: "custom-icon",
            html: `<div style="
                display: flex;
                justify-content: center;
                align-items: center;
                background: ${color};
                color: white;
                font-weight: bold;
                font-size: 14px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            ">${averageRating.toFixed(1)}</div>`,
        });
    };

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer center={[31.9461, 34.8516]} zoom={9} style={{ height: "100vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler />

                {restaurants.map((restaurant) => {
                    const averageRating = calculateAverageRating(restaurant.rating)
                    return <Marker
                        key={restaurant.id}
                        position={[restaurant.lat, restaurant.lng]}
                        icon={createIcon(averageRating)}
                    >
                        <Popup>
                            <RestaurantCard
                                restaurant={restaurant}
                                averageRating={averageRating}
                                handleDeleteRestaurant={handleDeleteRestaurant}
                            />
                        </Popup>
                    </Marker>
                })}

                {friendsRestaurants.map((friendRestaurant) => {
                    const averageRating = calculateAverageRating(friendRestaurant.rating)
                    return <Marker
                        key={friendRestaurant.id}
                        position={[friendRestaurant.lat, friendRestaurant.lng]}
                        icon={createIcon(averageRating)}
                    >
                        <Popup>
                            <RestaurantCard
                                rateOwner={friendRestaurant.friend.username}
                                restaurant={friendRestaurant}
                                averageRating={averageRating}
                            />
                        </Popup>
                    </Marker>
                })}

                {addRestaurantPopupOpen && rightClickedLocation && (
                    <AddRestaurantPopup
                        open={addRestaurantPopupOpen}
                        onClose={() => setAddRestaurantPopupOpen(false)}
                        onSubmit={handleAddRestaurant}
                        location={rightClickedLocation}
                    />
                )}

            </MapContainer>
        </div>
    );
};

export default MapComponent;
