import { Box, Container, Paper, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface DecodedToken {
  email: string;
  name: string;
  picture: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.error.main,
}));

const StyledBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
}));

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
      await onLogin(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to decode ID token:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <StyledBox>
      <StyledContainer maxWidth="xs">
        <StyledPaper elevation={3}>
          <StyledTitle variant="h4" gutterBottom>
            Welcome to ATE
          </StyledTitle>
          <StyledBody variant="body1">
            Sign in with your Google account to continue.
          </StyledBody>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </StyledPaper>
      </StyledContainer>
    </StyledBox>
  );
};

export default Login;
