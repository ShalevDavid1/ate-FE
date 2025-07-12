import { Box, Typography, Button, Stack } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import { styled } from '@mui/material/styles';

const StyledCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    maxWidth: 300,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

const StyledRatedBy = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    fontFamily: theme.typography.fontFamily,
}));

const StyledStarIcon = styled(StarIcon, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
    color: active ? theme.palette.warning.main : theme.palette.grey[300],
    fontSize: 20,
}));

interface Props {
    restaurant: Restaurant;
    averageRating: number;
    handleDeleteRestaurant?: (restaurantId: number) => void;
    rateOwner?: string;
}

const RestaurantCard = ({ restaurant, averageRating, handleDeleteRestaurant, rateOwner }: Props) => {
    const renderStars = (rating: number) => {
        return (
            <Box>
                {Array.from({ length: 5 }, (_, index) => (
                    <StyledStarIcon key={index} active={index < rating} />
                ))}
            </Box>
        );
    };

    return (
        <StyledCard>
            <StyledTitle variant="h6">
                {restaurant.name}
            </StyledTitle>

            <Stack spacing={1}>
                { [
                    { label: "Total Rating", rating: averageRating },
                    { label: "Food Rating", rating: restaurant.rating.foodRating },
                    { label: "Price Rating", rating: restaurant.rating.priceRating },
                    { label: "Service Rating", rating: restaurant.rating.serviceRating },
                    { label: "Vibe Rating", rating: restaurant.rating.vibeRating }
                ].map(({ label, rating }, index) => (
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        key={index}
                    >
                        <StyledLabel variant="body1">
                            <strong>{label}:</strong>
                        </StyledLabel>
                        {renderStars(rating)}
                    </Stack>
                ))}
            </Stack>

            {rateOwner && <StyledRatedBy>
                Rated By: {rateOwner}
            </StyledRatedBy>}

            {handleDeleteRestaurant && <StyledButton
                variant="contained"
                color="error"
                onClick={() => handleDeleteRestaurant(restaurant.id)}
            >
                Delete Restaurant
            </StyledButton>}
        </StyledCard>
    );
};

export default RestaurantCard;
