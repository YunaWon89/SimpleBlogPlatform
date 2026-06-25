
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">Realworld Blog</Link>
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Sign in
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Sign up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}