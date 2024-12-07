import { Box, Container, Paper, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


interface DecodedToken {
  email: string;
  name: string;
  picture: string;
}

const Login = ({ onLogin }: { onLogin: (user: UserInfo) => void }) => {

  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    try {
      // Decode the ID token
      const decodedToken: DecodedToken = jwtDecode(idToken);

      // Extract user info
      console.log("User Info:", decodedToken);

      // Example: Save user info to state or send to backend
      const user = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      };
      console.log("Authenticated User:", user);
      await onLogin(user)
      navigate("/dashboard")
    } catch (error) {
      console.error("Failed to decode ID token:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1c2533",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: "10px",
            backgroundColor: "#2a3b4e",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#e57373" }}
          >
            Welcome to ATE
          </Typography>
          <Typography variant="body1" sx={{ color: "#fff", marginBottom: 3 }}>
            Sign in with your Google account to continue.
          </Typography>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
