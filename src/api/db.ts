import axios from "axios";


class DBAPI {
    static HOST = import.meta.env.VITE_HOST_URL;
    
    public static getRestaurants = () => {
        return axios.get(`${this.HOST}/restaurants`);
    }
}

export default DBAPI