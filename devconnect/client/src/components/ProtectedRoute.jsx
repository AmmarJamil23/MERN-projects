import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, logout } = useAuth();

  // if no token, go to login
  if (!token) return <Navigate to="/login" replace />;

  try {
    // decode token payload
    const { exp } = JSON.parse(atob(token.split(".")[1]));

    // check expiry
    const isExpired = exp * 1000 < Date.now();

    if (isExpired) {
      logout(); // remove token from context + localStorage
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    // if token is corrupted or not decodable
    console.log(err);
    logout();
    return <Navigate to="/login" replace />;
  }

  // if valid, allow access
  return children;
}
