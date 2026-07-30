import { NavLink, Link } from "react-router-dom";
import Login from "../../pages/Login.jsx";
import "./Navbar.css";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Compare", href: "/compare" },
  { label: "Recommendations", href: "/recommendations" },
  { label: "Reviews", href: "/reviews" },
];

function Navbar({ apiUrl, user, onLogout }) {
  return (
    <header className="navbar">
      <Link className="navbar__logo" to="/">
        CardMaxer
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
            className={({ isActive }) =>
              isActive ? "navbar__link navbar__link--active" : "navbar__link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__auth">
        {user?.id ? (
          <>
            <span className="navbar__username">@{user.username}</span>
            <button type="button" className="navbar__logout" onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <Login apiUrl={apiUrl} />
        )}
      </div>
    </header>
  );
}

export default Navbar;
