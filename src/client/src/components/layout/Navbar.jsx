import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

const navLinkClass = ({ isActive }) =>
  isActive ? "navbar__link navbar__link--active" : "navbar__link";

function Navbar({ apiUrl, user, isAuthLoading, authError, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar__nav" aria-label="Main navigation">
        <div className="navbar__main">
          <Link className="navbar__brand" to="/">
            CardMaxer
          </Link>
          <div
            className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`.trim()}
            id="navbar-links"
          >
            <NavLink className={navLinkClass} to="/discover" onClick={closeMenu}>
              Discover
            </NavLink>
            <NavLink
              className={navLinkClass}
              to="/recommendations"
              onClick={closeMenu}
            >
              Card Matcher
            </NavLink>
            {user?.id && (
              <>
                <NavLink className={navLinkClass} to="/profile" onClick={closeMenu}>
                  Profile
                </NavLink>
                <NavLink className={navLinkClass} to="/reviews" onClick={closeMenu}>
                  Reviews
                </NavLink>
                <NavLink className={navLinkClass} to="/favorites" onClick={closeMenu}>
                  Favorites
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__menu-button"
            aria-controls="navbar-links"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
          {isAuthLoading ? (
            <span className="navbar__session-status" role="status">
              Checking session...
            </span>
          ) : user?.id ? (
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
      {authError && (
        <p className="navbar__session-error" role="alert">
          {authError}
        </p>
      )}
    </header>
  );
}

export default Navbar;
