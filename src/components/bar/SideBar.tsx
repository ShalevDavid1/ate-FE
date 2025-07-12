import { Box, Typography, Button } from '@mui/material';
import FriendsAccordion from "./FriendsAccordion";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

interface SideBarProps {
    friendships: FriendInfo[];
    selectedFriendsRestaurants: number[];
    handleAddOrRemoveFriendRestaurant: (friendInfo: FriendInfo) => void;
    handleAddFriendship: (friendEmail: string) => void;
}

const StyledSidebar = styled(Box)(({ theme }) => ({
    width: 250,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    direction: 'ltr',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    color: theme.palette.text.primary,
}));

const StyledAboutButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    textTransform: 'none',
}));

const Sidebar = ({ friendships, selectedFriendsRestaurants, handleAddOrRemoveFriendRestaurant, handleAddFriendship }: SideBarProps) => {
    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate("/about")
    }

    return (
        <StyledSidebar>
            <StyledTitle variant="h6" gutterBottom>
                ATE
            </StyledTitle>

            <FriendsAccordion
                friendships={friendships}
                selectedFriendsRestaurants={selectedFriendsRestaurants}
                handleAddOrRemoveFriendRestaurant={handleAddOrRemoveFriendRestaurant}
                handleAddFriendship={handleAddFriendship}
            />

            <StyledAboutButton
                variant="text"
                onClick={handleAboutClick}
            >
                About
            </StyledAboutButton>
        </StyledSidebar>
    );
};

export default Sidebar;
