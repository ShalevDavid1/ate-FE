import {
    Box, Typography, Checkbox, FormControlLabel, Button,
    AccordionDetails, Accordion, AccordionSummary, TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

interface FriendsAccordionProps {
    friendships: FriendInfo[];
    selectedFriendsRestaurants: number[];
    handleAddOrRemoveFriendRestaurant: (friendInfo: FriendInfo) => void;
    handleAddFriendship: (friendEmail: string) => void;
}


const FriendsAccordion = ({ friendships, selectedFriendsRestaurants,
    handleAddOrRemoveFriendRestaurant, handleAddFriendship }: FriendsAccordionProps) => {
    const [newFriendEmail, setNewFriendEmail] = useState<string>("")

    return (<Accordion
        sx={{
            backgroundColor: '#34495E',
            color: 'white',
            borderRadius: 1,
            marginBottom: 2,
            boxShadow: 'none',
        }}
    >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />} id="friends-list-header">
            <Typography sx={{ fontWeight: 'bold' }}>Friends List</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {friendships.length > 0 ? (
                friendships.map((friend) => (
                    <FormControlLabel
                        key={friend.id}
                        control={
                            <Checkbox
                                sx={{ color: 'white' }}
                                checked={selectedFriendsRestaurants.includes(friend.id)}
                                onChange={(e) => handleAddOrRemoveFriendRestaurant(friend)}
                            />}
                        label={<Typography sx={{ color: 'white' }}>{friend.email}</Typography>}
                    />
                ))
            ) : (
                <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>No friends added yet</Typography>
            )}

            {/* Add Friend Section */}
            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Add Friend Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={newFriendEmail}
                    onChange={(e) => setNewFriendEmail(e.target.value)}
                    sx={{
                        input: { color: 'white' },
                        backgroundColor: '#2C3E50',
                        color: 'white',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#7f8c8d',
                            },
                            '&:hover fieldset': {
                                borderColor: '#bdc3c7',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{ mt: 1, backgroundColor: '#E74C3C', '&:hover': { backgroundColor: '#C0392B' } }}
                    onClick={() => handleAddFriendship(newFriendEmail)}
                >
                    Add Friend
                </Button>
            </Box>
        </AccordionDetails>
    </Accordion>
    )
}

export default FriendsAccordion;
