import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    Box,
    Rating
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Restaurant</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="Restaurant Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Formatted Adress"
                        variant="outlined"
                        value={formattedAddress}
                        onChange={(e) => setFormattedAddress(e.target.value)}
                        fullWidth
                    />
                    <Box>
                        <label>Food Rating</label>
                        <Rating
                            name="simple-controlled"
                            value={foodRating}
                            onChange={(_e, value) => setFoodRating(value as number)}
                        />
                    </Box>
                    <Box>
                        <label>Price Rating</label>
                        <Rating
                            name="simple-controlled"
                            value={priceRating}
                            onChange={(_e, value) => setPriceRating(value as number)}
                        />
                    </Box>
                    <Box>
                        <label>Service Rating</label>
                        <Rating
                            name="simple-controlled"
                            value={serviceRating}
                            onChange={(_e, value) => setServiceRating(value as number)}
                        />
                    </Box>
                    <Box>
                        <label>Vibe Rating</label>
                        <Rating
                            name="simple-controlled"
                            value={vibeRating}
                            onChange={(_e, value) => setVibeRating(value as number)}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRestaurantPopup;
