import { Box, Typography, Button, Stack } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";

interface Props {
    restaurant: Restaurant;
    averageRating: number;
    handleDeleteRestaurant: (restaurantId: number) => void;
}

const RestaurantCard = ({ restaurant, averageRating, handleDeleteRestaurant }: Props) => {
    const renderStars = (rating: number) => {
        return (
            <Box>
                {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                        key={index}
                        sx={{
                            color: index < rating ? "#FFD700" : "#E0E0E0",
                            fontSize: "20px",
                        }}
                    />
                ))}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                padding: "16px",
                borderRadius: "8px",
                maxWidth: "300px",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "16px",
                }}
            >
                {restaurant.name}
            </Typography>

            <Stack spacing={1}>
                {[
                    { label: "Total Rating", rating: averageRating },
                    { label: "Food Rating", rating: restaurant.rating.foodRating },
                    { label: "Price Rating", rating: restaurant.rating.priceRating },
                    { label: "Service Rating", rating: restaurant.rating.serviceRating },
                    { label: "Vibe Rating", rating: restaurant.rating.vibeRating },
                ].map(({ label, rating }, index) => (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        key={index}
                    >
                        <Typography variant="body1" sx={{ fontFamily: "'Roboto', sans-serif" }}>
                            <strong>{label}:</strong>
                        </Typography>
                        {renderStars(rating)}
                    </Stack>
                ))}
            </Stack>

            <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteRestaurant(restaurant.id)}
                sx={{
                    marginTop: "16px",
                    width: "100%",
                    fontFamily: "'Roboto', sans-serif",
                }}
            >
                Delete Restaurant
            </Button>
        </Box>
    );
};

export default RestaurantCard;
