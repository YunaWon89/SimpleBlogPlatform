import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../assets/shiba.jpg";

import {
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { user } = useAuth();

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
                Sign In
              </NavLink>

              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `signup-btn ${isActive ? "active" : ""}`
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/new-article"
                className={({ isActive }) =>
                  `nav-link icon-link ${isActive ? "active" : ""}`
                }
              >
                <PencilSquareIcon className="header-icon" />
                <span>New Post</span>
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `nav-link icon-link ${isActive ? "active" : ""}`
                }
              >
                <Cog6ToothIcon className="header-icon" />
                <span>Settings</span>
              </NavLink>

              <NavLink
  to="/profile"
  className={({ isActive }) =>
    `nav-link icon-link ${isActive ? "active" : ""}`
  }
>
  <img
    src={user.image || defaultAvatar}
    alt={user.username}
    className="header-avatar"
    onError={(e) => {
      e.currentTarget.src = defaultAvatar;
    }}
  />

  <span>{user.username}</span>
</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}