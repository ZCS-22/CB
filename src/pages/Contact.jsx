import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";

function useInViewOnce(threshold = 0.2) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return [ref, isVisible];
}

function useSafeEventHandler() {
  return useCallback((handler, errorMessage = "Something went wrong.") => {
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
  }, []);
}

function ContactInfo() {
  const [infoRef, infoVisible] = useInViewOnce(0.2);

  return (
    <div
      ref={infoRef}
      className={`contact-info ${
        infoVisible ? "contact-show-up" : "contact-hidden-up"
      }`}
    >
      <h1 className="contact-info-title">Contact Info</h1>

      <p className="contact-info-desc">
        We&apos;re excited to welcome you into our dance family. Want to meet us
        in person? Swing by our dance studio at our venue.
      </p>

      <div className="contact-info-item">
        <div className="contact-info-icon-circle">
          <i className="bi bi-telephone-fill" aria-hidden="true"></i>
        </div>

        <div className="contact-info-copy">
          <h3>Hotline</h3>
          <a href="tel:+15127617472" className="contact-info-link">
            +1 (512) 761-7472
          </a>
        </div>
      </div>

      <div className="contact-info-item">
        <div className="contact-info-icon-circle">
          <i className="bi bi-envelope-fill" aria-hidden="true"></i>
        </div>

        <div className="contact-info-copy">
          <h3>Email</h3>
          <a
            href="mailto:chennaibeats396@gmail.com"
            className="contact-info-link"
          >
            chennaibeats396@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

function GetInTouch() {
  const [sectionRef, show] = useInViewOnce(0.2);
  const safeEventHandler = useSafeEventHandler();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5137";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",   // empty = forces user to pick a location
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return false;
    }

    if (!emailPattern.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }

    if (!formData.location.trim()) {
      toast.error("Please select your location.");
      return false;
    }

    if (!formData.comment.trim()) {
      toast.error("Please enter your comment.");
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      if (!e || typeof e.preventDefault !== "function") {
        throw new Error("Submit event was not passed correctly.");
      }

      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/send-mail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.name.trim(),
            lastName: "",
            email: formData.email.trim(),
            contact: formData.phoneNumber.trim(),
            location: formData.location.trim(),
            message: formData.comment.trim(),
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data?.message || "Failed to submit the form.");
        }

        toast.success("Your message has been sent successfully.");

        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          location: "",   // reset to placeholder
          comment: "",
        });
      } catch (error) {
        console.error("Submit error:", error);

        if (error?.message === "Failed to fetch") {
          toast.error(
            "Cannot connect to the backend server. Check backend port and VITE_API_BASE_URL."
          );
        } else {
          toast.error(
            error.message || "Unable to send your message right now."
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [API_BASE_URL, formData, validateForm]
  );

  const handleSafeSubmit = safeEventHandler(
    handleSubmit,
    "Unable to handle the form submission right now."
  );

  return (
    <div
      ref={sectionRef}
      className={`contact-get_into-block ${
        show ? "contact-show-up" : "contact-hidden-up"
      }`}
    >
      <h2 className="contact-get_into-title">Get in touch</h2>

      <p className="contact-get_into-subtitle contact-get_into-subtitle-left">
        Have a question or a specific inquiry? Fill out the contact form and
        we&apos;ll receive your message directly.
      </p>

      <form className="contact-get_into-form" onSubmit={handleSafeSubmit}>
        <div className="contact-get_into-form-grid">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            autoComplete="tel"
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}>
            <option value="" disabled>Select your location</option>
            <option value="Renton">Renton</option>
            <option value="Redmond">Redmond</option>
            <option value="Bellevue">Bellevue</option>
            <option value="Bothell">Bothell</option>
          </select>
        </div>

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          rows="6"
        />

        <button
          type="submit"
          className="contact-get_into-form-send-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="contact-section">
      <ContactInfo />

      <div className="contact-right">
        <GetInTouch />
      </div>
    </section>
  );
}