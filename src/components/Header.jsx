import { NavLink } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cls = ({ isActive }) =>
    isActive ? "header-link active" : "header-link";

  const useSafeEventHandler = useCallback(
    (handler, errorMessage = "Something went wrong.") => {
      return async (event, ...args) => {
        try {
          if (typeof handler !== "function") {
            throw new Error("Event handler is undefined.");
          }
          await handler(event, ...args);
        } catch (error) {
          console.error("Event handler error:", error);
          toast.error(errorMessage);
        }
      };
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    const safeScroll = useSafeEventHandler(handleScroll, "Unable to update header on scroll.");
    safeScroll();
    window.addEventListener("scroll", safeScroll);
    return () => window.removeEventListener("scroll", safeScroll);
  }, [useSafeEventHandler]);

  /* Close drawer when route changes */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          {/* Brand */}
          <NavLink to="/" className="header-brand" onClick={closeMenu}>
            <div className="header-logo-circle">CB</div>
            <div className="header-logo-text-block">
              <span className="header-logo-name">Chennai Beats</span>
              <span className="header-logo-sub">Dance Academy</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="header-links" aria-label="Main navigation">
            <NavLink to="/" end className={cls}>Home</NavLink>
            <NavLink to="/About" className={cls}>About</NavLink>
            <NavLink to="/Classes" className={cls}>Classes</NavLink>
            <NavLink to="/Event" className={cls}>Events</NavLink>
            <NavLink to="/Costume-Rental" className={cls}>Costumes</NavLink>
            <NavLink to="/Contact" className={cls}>Contact</NavLink>
          </nav>

          {/* Enroll CTA (desktop) */}
          <a
            href="https://form.jotform.com/232330427478153"
            target="_blank"
            rel="noopener noreferrer"
            className="header-enroll-btn"
          >
            Enroll Now
          </a>

          {/* Hamburger (mobile) */}
          <button
            className={`header-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`header-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
          <nav className="header-drawer-links" aria-label="Mobile navigation">
            <NavLink to="/" end className="header-drawer-link" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/About" className="header-drawer-link" onClick={closeMenu}>About</NavLink>
            <NavLink to="/Classes" className="header-drawer-link" onClick={closeMenu}>Classes</NavLink>
            <NavLink to="/Event" className="header-drawer-link" onClick={closeMenu}>Events</NavLink>
            <NavLink to="/Costume-Rental" className="header-drawer-link" onClick={closeMenu}>Costume Rental</NavLink>
            <NavLink to="/Contact" className="header-drawer-link" onClick={closeMenu}>Contact</NavLink>
          </nav>
          <div className="header-drawer-footer">
            <a
              href="https://form.jotform.com/232330427478153"
              target="_blank"
              rel="noopener noreferrer"
              className="header-drawer-enroll"
              onClick={closeMenu}
            >
              Enroll Now →
            </a>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="header-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
