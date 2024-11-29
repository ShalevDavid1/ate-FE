import { useEffect, useState } from "react";
import MapComponent from "./map/Map";
import Sidebar from "./bar/SideBar";
import DBAPI from "../api/db";
import "./Main.css"

interface MainProps {
    userInfo: UserInfo;
}

const Main = ({ userInfo }: MainProps) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    // // Fetch restaurants from backend
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await DBAPI.getRestaurants()
                console.log(response.data);
                
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    console.log(userInfo.email);

    return (
        <div className="app-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="map-container">
                <MapComponent restaurants={restaurants} />
            </div>
        </div>
    );
};

export default Main;
