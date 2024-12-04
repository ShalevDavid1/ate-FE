import axios from "axios";
import axiosRetry from "axios-retry";
import { toSnakeCase } from "../utils/FormatConverter";

const api = axios.create({ baseURL: import.meta.env.VITE_HOST_URL });

axiosRetry(api, { retries: 3 });

class DBAPI {

    public static getRestaurants = (email: string) => {
        return api.get(`/restaurants?email=${email}`);
    }


    public static AddRatedRestaurant = (userEmail: string, restaurantAndRating: AddNewRestaurant) => {
        const ratedRestaurant = toSnakeCase(restaurantAndRating)
        return api.post(`/restaurants/add_rated_restaurant?email=${userEmail}`, ratedRestaurant);
    }

    public static DeleteRatedRestaurant = (userEmail: string, restaurantId: number) => {
        return api.delete(`/ratings/delete_rated_restaurant?email=${userEmail}&restaurant_id=${restaurantId}`);
    }
}

export default DBAPI