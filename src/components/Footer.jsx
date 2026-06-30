import { Link } from "react-router-dom";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const year = new Date().getFullYear();

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

  const handleSubmit = useCallback(async (e) => {
    if (!e || typeof e.preventDefault !== "function") {
      throw new Error("Submit event was not passed correctly.");
    }

    e.preventDefault();

    // Keep original behavior unchanged.
  }, []);

  const handleSafeSubmit = useSafeEventHandler(
    handleSubmit,
    "Unable to handle subscription right now."
  );

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-top">
          <div className="footer-column left">
            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="footer-contact-text">
                <h4>Phone</h4>
                <a href="tel:+15127617472">+1 (512) 761-7472</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="footer-contact-text">
                <h4>Email</h4>
                <a href="mailto:chennaibeats396@gmail.com">
                  chennaibeats396@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer-column center">
            <h3 className="footer-title">Jump into</h3>

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
                href="https://www.youtube.com/@chennaibeats3335"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube"></i>
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
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © {year}{" "}
            <a
              href="https://zebraconsultancyservices.com/"
              target="_blank"
              rel="noreferrer"
            >
              ZCS
            </a>{" "}
            | <Link to="/privacy-policy">Privacy Policies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}