import "./Sidebar.css";

import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FriendsAccordion from "./FriendsAccordion";
import DBAPI from "../../api/db";

interface SideBarProps {
    friendships: FriendInfo[];
    selectedFriendsRestaurants: number[];
    handleAddOrRemoveFriendRestaurant: (friendInfo: FriendInfo) => void;
    handleAddFriendship: (friendEmail: string) => void;
}

const Sidebar = ({ friendships, selectedFriendsRestaurants, handleAddOrRemoveFriendRestaurant, handleAddFriendship }: SideBarProps) => {

    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about")
    }

    return (
        <Box sx={{ width: 250, backgroundColor: '#2C3E50', color: 'white', padding: 2, display: 'flex', flexDirection: 'column', direction: 'ltr' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                ATE
            </Typography>

            <FriendsAccordion
                friendships={friendships}
                selectedFriendsRestaurants={selectedFriendsRestaurants}
                handleAddOrRemoveFriendRestaurant={handleAddOrRemoveFriendRestaurant}
                handleAddFriendship={handleAddFriendship}
            />

            <Button
                variant="text"
                sx={{ color: 'white', marginBottom: 2, textTransform: 'none' }}
                onClick={handleAboutClick}
            >
                About
            </Button>
        </Box>
    );
};

export default Sidebar;
