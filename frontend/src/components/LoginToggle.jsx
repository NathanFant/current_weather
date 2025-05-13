import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginToggle() {
  const { user } = useUser();

  return (
    <div className="login-toggle">
      <Link to={user ? "/preferences" : "/login"}>
        {user ? "Preferences" : "Login"}
      </Link>
    </div>
  );
}
