import {
    Box, Typography, Checkbox, FormControlLabel,
    AccordionDetails, AccordionSummary, TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';

interface FriendsAccordionProps {
    friendships: FriendInfo[];
    selectedFriendsRestaurants: number[];
    handleAddOrRemoveFriendRestaurant: (friendInfo: FriendInfo) => void;
    handleAddFriendship: (friendEmail: string) => void;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: theme.palette.text.primary,
    },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    backgroundColor: 'inherit',
    color: theme.palette.text.primary,
}));

const StyledFriendLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const StyledNoFriends = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.disabled,
    fontStyle: 'italic',
}));

const StyledAddFriendButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    borderRadius: 24,
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.error.dark,
        boxShadow: 'none',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& .MuiOutlinedInput-root': {
        borderRadius: 24,
        '& fieldset': {
            borderColor: theme.palette.divider,
            borderRadius: 24,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.text.secondary,
        },
        '& input': {
            color: theme.palette.text.primary,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.primary,
    },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const FriendsAccordion = ({ friendships, selectedFriendsRestaurants,
    handleAddOrRemoveFriendRestaurant, handleAddFriendship }: FriendsAccordionProps) => {
    const [newFriendEmail, setNewFriendEmail] = useState<string>("")

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} id="friends-list-header">
                <Typography sx={{ fontWeight: 'bold' }}>Friends List</Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
                {friendships.length > 0 ? (
                    friendships.map((friend) => (
                        <FormControlLabel
                            key={friend.id}
                            control={
                                <StyledCheckbox
                                    checked={selectedFriendsRestaurants.includes(friend.id)}
                                    onChange={() => handleAddOrRemoveFriendRestaurant(friend)}
                                />
                            }
                            label={<StyledFriendLabel>{friend.email}</StyledFriendLabel>}
                        />
                    ))
                ) : (
                    <StyledNoFriends>No friends added yet</StyledNoFriends>
                )}

                {/* Add Friend Section */}
                <Box sx={{ mt: 2 }}>
                    <StyledTextField
                        label="Add Friend Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={newFriendEmail}
                        onChange={(e) => setNewFriendEmail(e.target.value)}
                    />
                    <StyledAddFriendButton
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAddFriendship(newFriendEmail)}
                    >
                        Add Friend
                    </StyledAddFriendButton>
                </Box>
            </StyledAccordionDetails>
        </StyledAccordion>
    )
}

export default FriendsAccordion;
