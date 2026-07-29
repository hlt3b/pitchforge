import { useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Deals', href: '#deals' },
  { label: 'About', href: '#about' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="#home" className="navbar__brand">
          PitchForge
        </a>

        <nav
          className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar
