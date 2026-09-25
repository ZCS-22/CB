import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        {/* Top grid */}
        <div className="footer-top">

          {/* Column 1 — Brand */}
          <div className="footer-column brand">
            <div className="footer-logo-row">
              <div className="footer-logo-circle">CB</div>
              <div>
                <div className="footer-brand-name">Chennai Beats</div>
                <div className="footer-brand-sub">Dance Academy · Seattle</div>
              </div>
            </div>
            <p className="footer-tagline">
              Where rhythm meets passion. Bollywood, Folk, K-Pop, Freestyle
              and more — for every age and skill level in Seattle.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/ChennaiBeatsDanceAcademy"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/chennai.beats/"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@chennaibeats3335"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="footer-column nav-col">
            <h4 className="footer-col-title">Explore</h4>
            <nav className="footer-nav-links" aria-label="Footer navigation">
              <Link to="/" className="footer-nav-link">Home</Link>
              <Link to="/About" className="footer-nav-link">About us</Link>
              <Link to="/Classes" className="footer-nav-link">Classes</Link>
              <Link to="/Event" className="footer-nav-link">Events</Link>
              <Link to="/Costume-Rental" className="footer-nav-link">Costume Rental</Link>
              <Link to="/Contact" className="footer-nav-link">Contact</Link>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="footer-column contact-col">
            <h4 className="footer-col-title">Get in Touch</h4>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="footer-contact-text">
                <span className="footer-contact-label">Phone</span>
                <a href="tel:+15127617472">+1 (512) 761-7472</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="footer-contact-text">
                <span className="footer-contact-label">Email</span>
                <a href="mailto:chennaibeats396@gmail.com">
                  chennaibeats396@gmail.com
                </a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="footer-contact-text">
                <span className="footer-contact-label">Location</span>
                <span>Seattle, Washington</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {year}{" "}
            <a
              href="https://zebraconsultancyservices.com/"
              target="_blank"
              rel="noreferrer"
            >
              ZCS
            </a>{" "}
            · Chennai Beats Dance Academy. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/Contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
