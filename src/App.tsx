import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import { useState } from "react";
import Main from "./components/Main";
import About from "./components/About";


const clientId = "test"


const App = () => {
  const [user, setUser] = useState<UserInfo | null>({
    "email": "shalevd20144@gmail.com",
    "name": "שליו דוד",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocKa_kPeJwtl6JuJ_ptacDrMoW49l75LPj1warrWwjZ64CVM4w=s96-c"
});

  const handleLogin = (userData: UserInfo) => {
    console.log(userData);
    setUser(userData);
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
          <Route path="/about" element={<About />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                { user ? <Main userInfo={user} /> : null}
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
