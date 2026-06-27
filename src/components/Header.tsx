import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Realworld Blog
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/sign-in" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Sign in
              </NavLink>

              <NavLink to="/sign-up" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link">
                {user.username}
              </Link>

              <Link to="/settings" className="nav-link">
                Settings
              </Link>

              <button onClick={logout} className="nav-link">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}