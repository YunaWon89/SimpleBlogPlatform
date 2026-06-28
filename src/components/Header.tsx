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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Sign in
              </NavLink>

              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/new-article"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                + New Article
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {user.username}
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Settings
              </NavLink>

              <button onClick={logout} className="nav-button">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}