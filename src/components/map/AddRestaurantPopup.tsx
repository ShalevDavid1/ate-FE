import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Rating,
    Stack,
    Typography
} from "@mui/material";

export interface AddRestaurantInterface {
    name: string;
    formattedAddress: string;
    foodRating: number;
    priceRating: number;
    serviceRating: number;
    vibeRating: number;
    location: [number, number];
}

interface AddRestaurantPopupProps {
    open: boolean;
    location: [number, number];
    onClose: () => void;
    onSubmit: (restaurant: AddRestaurantInterface) => void;
}

const AddRestaurantPopup = ({ open, onClose, onSubmit, location }: AddRestaurantPopupProps) => {
    const [name, setName] = useState<string>("");
    const [formattedAddress, setFormattedAddress] = useState<string>("");
    const [foodRating, setFoodRating] = useState<number>(3);
    const [priceRating, setPriceRating] = useState<number>(3);
    const [serviceRating, setServiceRating] = useState<number>(3);
    const [vibeRating, setVibeRating] = useState<number>(3);

    const resetForm = () => {
        setName("");
        setFoodRating(3);
        setPriceRating(3);
        setServiceRating(3);
        setVibeRating(3);
    }

    const handleSubmit = () => {
        if (!name.trim()) { alert("Please enter a restaurant name."); return; }
        if (!formattedAddress.trim()) { alert("Please enter a formatted adress."); return; }

        onSubmit({ name, formattedAddress, foodRating, priceRating, serviceRating, vibeRating, location });
        resetForm();
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Add New Restaurant</DialogTitle>
            <DialogContent>
                <Stack spacing={0.8}>
                    <TextField
                        label="Restaurant Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Formatted Address"
                        variant="outlined"
                        fullWidth
                        value={formattedAddress}
                        onChange={(e) => setFormattedAddress(e.target.value)}
                    />

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Food Rating
                        </Typography>
                        <Rating
                            name="food-rating"
                            value={foodRating}
                            onChange={(_, newValue) => setFoodRating(newValue || 3)}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Price Rating
                        </Typography>
                        <Rating
                            name="price-rating"
                            value={priceRating}
                            onChange={(_, newValue) => setPriceRating(newValue || 3)}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Service Rating
                        </Typography>
                        <Rating
                            name="service-rating"
                            value={serviceRating}
                            onChange={(_, newValue) => setServiceRating(newValue || 3)}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Vibe Rating
                        </Typography>
                        <Rating
                            name="vibe-rating"
                            value={vibeRating}
                            onChange={(_, newValue) => setVibeRating(newValue || 3)}
                        />
                    </Box>

                    {/* Action Buttons */}
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Button variant="text" color="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default AddRestaurantPopup;
