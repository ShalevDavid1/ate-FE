interface RestaurantRating {
    foodRating: number;
    priceRating: number;
    serviceRating: number;
    vibeRating: number;
}

interface AddNewRestaurant {
    name: string;
    lat: number;
    lng: number;
    formattedAddress: string;
    rating: RestaurantRating;
}

interface Restaurant extends AddNewRestaurant {
    id: number;
}

interface FriendRestaurant extends Restaurant {
    friend: FriendInfo;
}
