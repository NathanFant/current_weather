import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginToggle() {
  const { user } = useUser();

  return (
    <div className="login-toggle">
      {user ? (
        <Link to="/preferences" className="search_button">Preferences ({user.username})</Link>
      ) : (
        <Link to="/login" className="search_button">Login</Link>
      )}
    </div>
  );
}
