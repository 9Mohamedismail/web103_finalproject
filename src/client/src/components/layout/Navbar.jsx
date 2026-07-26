import './Navbar.css'

const navLinks = [
  { label: 'Discover', href: '#' },
  { label: 'Compare', href: '#', active: true },
  { label: 'Recommendations', href: '#' },
  { label: 'Reviews', href: '#' },
]

function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar__logo" href="#">
        CardMaxer
      </a>

      <nav className="navbar__links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={link.active ? 'navbar__link navbar__link--active' : 'navbar__link'}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="navbar__auth">
        <a className="navbar__login" href="#">
          Log In
        </a>
        <a className="navbar__signup" href="#">
          Sign Up
        </a>
      </div>
    </header>
  )
}

export default Navbar
