import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const AboutPage = () => {

  const navigate = useNavigate();

  const navigateToDashboard = () => { navigate("/dashboard"); }

  return (
    <Box
      sx={{
        backgroundColor: "#0E1A2B",
        minHeight: "100vh",
        padding: 4,
        color: "#FFFFFF",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#16243C",
          padding: 4,
          borderRadius: 3,
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#FF6347",
            marginBottom: 2,
          }}
        >
          ATE: Where Food Meets Friendship
        </Typography>

        <Typography
          variant="body1"
          align="center"
          paragraph
          sx={{ color: "#D1D9E6", marginBottom: 3 }}
        >
          ATE was created with love, inspired by the desire to share memorable
          dining experiences. Originally designed as a special gift for my
          girlfriend, ATE has grown into a platform that brings friends
          together over great food. Whether it's exploring new cuisines,
          reminiscing about favorite meals, or finding hidden gems, ATE makes
          food a shared adventure.
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#FFFFFF" }}
        >
          What You Can Do with ATE
        </Typography>
        <ul style={{ paddingLeft: "1.5rem", color: "#B0BEC5" }}>
          {[
            "Discover Restaurants: Browse and explore new places to eat on an interactive map.",
            "Rate Your Experiences: Share honest feedback with detailed ratings for food, service, price, and vibe.",
            "Track Your Favorites: Save your favorite restaurants and see ratings at a glance.",
            "Connect with Friends: Build your food-loving community by adding friends and sharing recommendations.",
            "Personalized Map Markers: See restaurant ratings directly on the map with intuitive color-coded markers.",
          ].map((feature, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              {feature}
            </li>
          ))}
        </ul>

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF6347",
              color: "#FFFFFF",
              fontWeight: "bold",
              borderRadius: 3,
              "&:hover": { backgroundColor: "#FF3E2F" },
              paddingX: 4,
            }}
            onClick={navigateToDashboard}
          >
            Start Sharing Experiences
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AboutPage;
