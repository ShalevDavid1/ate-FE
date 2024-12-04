import { Box, Typography, Button, Rating } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    restaurant: Restaurant;
    averageRating: number;
    handleDeleteRestaurant: (restaurantId: number) => void;
}

const RestaurantCard = ({ restaurant, averageRating, handleDeleteRestaurant }: Props) => {
    const renderStars = (value: number) => (
        <Rating value={value} precision={0.5} readOnly size="small" />
    );

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {restaurant.name}
            </Typography>

            <Typography variant="body1">
                <strong>Total Rating:</strong> {renderStars(averageRating)}
            </Typography>

            <Typography variant="body1">
                <strong>Food Rating:</strong> {renderStars(restaurant.rating.foodRating)}
            </Typography>

            <Typography variant="body1">
                <strong>Price Rating:</strong> {renderStars(restaurant.rating.priceRating)}
            </Typography>

            <Typography variant="body1">
                <strong>Service Rating:</strong> {renderStars(restaurant.rating.serviceRating)}
            </Typography>

            <Typography variant="body1">
                <strong>Vibe Rating:</strong> {renderStars(restaurant.rating.vibeRating)}
            </Typography>
            <Button
                variant="contained"
                color="error"
                // startIcon={<DeleteIcon />}
                size="small"
                sx={{
                    mt: 2,
                    textTransform: 'none',
                    width: '100%',
                    maxWidth: '200px',
                }}
                onClick={() => handleDeleteRestaurant(restaurant.id)}
            >
                Delete Restaurant
            </Button>
        </Box>
    );
};

export default RestaurantCard;
