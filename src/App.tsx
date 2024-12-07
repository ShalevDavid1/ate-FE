import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import Main from "./components/Main";
import { useState } from "react";
import DBAPI from "./api/db";


const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID


const App = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const handleLogin = async (userData: UserInfo) => {
    try {
      const response = await DBAPI.addUserIfNotExists(userData);
      setUser(userData)
    }
    catch {
      alert("Failed to log in. Please try again.");
    }
  };

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {user ? <Main userInfo={user} /> : null}
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
