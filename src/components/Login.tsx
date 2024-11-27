import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


interface DecodedToken {
  email: string;
  name: string;
  picture: string;
}

const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {

  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: any) => {
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
      onLogin(user)
      navigate("/dashboard")
    } catch (error) {
      console.error("Failed to decode ID token:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My App</h1>
      <p>Sign in with your Google account to continue.</p>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
};

export default Login;
