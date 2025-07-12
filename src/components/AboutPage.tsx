import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  padding: theme.spacing(4),
  color: theme.palette.text.primary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 3,
  maxWidth: 600,
  margin: "auto",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const StyledBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
}));

const StyledList = styled("ul")(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

const StyledListItem = styled("li")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightBold,
  borderRadius: theme.shape.borderRadius * 3,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

const AboutPage = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <StyledBox>
      <StyledPaper elevation={3}>
        <StyledTitle variant="h4" align="center" gutterBottom>
          ATE: Where Food Meets Friendship
        </StyledTitle>

        <StyledBody variant="body1" align="center" paragraph>
          ATE was created with love, inspired by the desire to share memorable
          dining experiences. Originally designed as a special gift for my
          girlfriend, ATE has grown into a platform that brings friends
          together over great food. Whether it's exploring new cuisines,
          reminiscing about favorite meals, or finding hidden gems, ATE makes
          food a shared adventure.
        </StyledBody>

        <StyledSectionTitle variant="h5" gutterBottom>
          What You Can Do with ATE
        </StyledSectionTitle>
        <StyledList>
          { [
            "Discover Restaurants: Browse and explore new places to eat on an interactive map.",
            "Rate Your Experiences: Share honest feedback with detailed ratings for food, service, price, and vibe.",
            "Track Your Favorites: Save your favorite restaurants and see ratings at a glance.",
            "Connect with Friends: Build your food-loving community by adding friends and sharing recommendations.",
            "Personalized Map Markers: See restaurant ratings directly on the map with intuitive color-coded markers."
          ].map((feature, index) => (
            <StyledListItem key={index}>
              {feature}
            </StyledListItem>
          ))}
        </StyledList>

        <Box textAlign="center" mt={3}>
          <StyledButton variant="contained" onClick={navigateToDashboard}>
            Start Sharing Experiences
          </StyledButton>
        </Box>
      </StyledPaper>
    </StyledBox>
  );
};

export default AboutPage;
