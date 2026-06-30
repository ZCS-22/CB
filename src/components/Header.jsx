import { NavLink } from "react-router-dom";
import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import CompanyLogo from "../assets/CB_Logo/YT circle.png";

export default function Header() {
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
    const navbar = document.querySelector(".header");
    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    const safeHandleScroll = useSafeEventHandler(
      handleScroll,
      "Unable to update header on scroll."
    );

    safeHandleScroll();
    window.addEventListener("scroll", safeHandleScroll);

    return () => window.removeEventListener("scroll", safeHandleScroll);
  }, [useSafeEventHandler]);

  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="header-brand">
          <img
            src={CompanyLogo}
            alt="Chennai Beats Logo"
            className="header-company-logo"
          />
        </NavLink>

        <nav className="header-links">
          <NavLink to="/" end className={cls}>
            Home
          </NavLink>

          <NavLink to="/About" className={cls}>
            About
          </NavLink>

          <NavLink to="/Classes" className={cls}>
            Classes
          </NavLink>

          <NavLink to="/Event" className={cls}>
            Event
          </NavLink>

          <NavLink to="/Costume-Rental" className={cls}>
            Costume Rental
          </NavLink>

          <NavLink to="/Contact" className={cls}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}