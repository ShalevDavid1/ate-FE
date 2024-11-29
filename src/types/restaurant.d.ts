interface RestrauntRate {
    food_rating: number;
    price_rating: number;
    service_rating: number;
    vibe_rating: number;
}

interface Restaurant {
    id: number;
    name: string;
    lat: number;
    lng: number;
    formatted_address: string;
    icon: str;
    restrauntRate: ?RestrauntRate;
}
