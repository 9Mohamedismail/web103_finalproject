import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

const placeholderLinks = ["Compare", "Recommendations", "Reviews"];

function Navbar({ apiUrl, user, onLogout }) {
  return (
    <header className="navbar">
      <nav className="navbar__nav" aria-label="Main navigation">
        <div className="navbar__main">
          <Link className="navbar__brand" to="/">
            CardMaxer
          </Link>
          <div className="navbar__links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar__link navbar__link--active" : "navbar__link"
              }
              to="/discover"
            >
              Discover
            </NavLink>
            {placeholderLinks.map((label) => (
              <Link className="navbar__link" key={label} to="/">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar__actions">
          {user?.id ? (
            <>
              <span className="navbar__username">@{user.username}</span>
              <button
                type="button"
                className="navbar__auth-button"
                onClick={onLogout}
              >
                Log out
              </button>
            </>
          ) : (
            <a className="navbar__auth-button" href={`${apiUrl}/auth/github`}>
              Log in with GitHub
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
