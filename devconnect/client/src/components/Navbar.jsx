import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex gap-4 mb-4 p-4 border-b">
      <Link to="/">Home</Link>
      <Link to="/explore">Explore</Link>

      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
