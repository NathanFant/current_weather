import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginToggle() {
  const { user } = useUser();

  return (
    <div className="login-toggle">
      {user ? (
        <Link to="/preferences">Preferences ({user.username})</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
