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
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
        </div>

        <div className="contact-info-copy">
          <h3>Address</h3>
          <p className="contact-info-link">
            Renton | Redmond | Bellevue | Bothell
          </p>
        </div>
      </div>

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
    location: "",
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
        const response = await fetch(`${API_BASE_URL}/send-mail`, {
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
          location: "",
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
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}>
            
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

function LocationSection() {
  const [locationRef, locationVisible] = useInViewOnce(0.15);

  const locations = [
    {
      name: "Redmond",
      building: "Dance Studio Venue",
      address: "23031 NE 61st St, Redmond, WA 98053, USA",
      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10748.816464187265!2d-122.03156700000001!3d47.66103100000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549073a8830c8787%3A0xd9a507fbfe0ef332!2s23031%20NE%2061st%20St%2C%20Redmond%2C%20WA%2098053%2C%20USA!5e0!3m2!1sen!2sin!4v1773573812064!5m2!1sen!2sin",
      link: "https://www.google.com/maps/search/?api=1&query=23031+NE+61st+St,+Redmond,+WA+98053",
    },
    {
      name: "Renton",
      building: "Rockin' Horse Dance Barn",
      address: "11820 150th Ave SE, Renton, WA 98059.",
      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10782.572134477712!2d-122.1401!3d47.496867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490662a50ee8459%3A0x456a2aab17f23a73!2sRockin&#39;%20Horse%20Dance%20Barn!5e0!3m2!1sen!2sin!4v1773573881074!5m2!1sen!2sin",
      link: "https://www.google.com/maps/search/?api=1&query=11820+150th+Ave+SE,+Renton,+WA+98059",
    },
    {
      name: "Bellevue",
      building: "Eyas Montessori School",
      address: "14219 Lake Hills Blvd, Bellevue, WA 98007.",
      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10761.912096635908!2d-122.15011000000001!3d47.597394!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c3c7c28b7d7%3A0x650f7ac0fe83a5e1!2sEyas%20Global%20Montessori%20School!5e0!3m2!1sen!2sin!4v1773573948115!5m2!1sen!2sin",
      link: "https://www.google.com/maps/search/?api=1&query=14219+Lake+Hills+Blvd,+Bellevue,+WA+98007",
    },
    {
      name: "Bothell",
      building: "Bothell",
      address: "2606 194th St SE, Bothell, WA 98012.",
      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10715.745187496383!2d-122.19781300000001!3d47.821452!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54900f5ab7ee5177%3A0xda99049c21346366!2s2606%20194th%20St%20SE%2C%20Bothell%2C%20WA%2098012%2C%20USA!5e0!3m2!1sen!2sin!4v1773574079572!5m2!1sen!2sin",
      link: "https://www.google.com/maps/search/?api=1&query=2606+194th+St+SE,+Bothell,+WA+98012",
    },
  ];

  return (
    <div
      ref={locationRef}
      className={`contact-block ${
        locationVisible ? "contact-show-up" : "contact-hidden-up"
      }`}
    >
      <h2 className="contact-location-title">Location</h2>
      <p className="contact-location-subtitle">Step into the spotlight !</p>

      <div className="contact-location-grid">
        {locations.map((loc) => (
          <div className="contact-location-card" key={loc.name}>
            <div className="contact-location-map-wrap">
              <iframe
                src={loc.map}
                title={loc.name}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="contact-location-map"
              />

              <a
                href={loc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-location-map-link"
                aria-label={`Open ${loc.name} location in Google Maps`}
                title={`Open ${loc.name} in Google Maps`}
              ></a>
            </div>

            <div className="contact-location-text">
              <h3 className="contact-location-name">{loc.name}</h3>
              <p className="contact-location-building">{loc.building}</p>
              <p className="contact-location-address">{loc.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="contact-section">
      <ContactInfo />

      <div className="contact-right">
        <GetInTouch />
        <LocationSection />
      </div>
    </section>
  );
}