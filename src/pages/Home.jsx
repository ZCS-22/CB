import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

import CompanyLogo from "../assets/CB_Logo/YT circle.png";

/* ---------------------------------------------------
   SAFE EVENT HANDLER
--------------------------------------------------- */
function useSafeEventHandler() {
  return useCallback((handler, errorMessage = "Something went wrong.") => {
    return async (...args) => {
      try {
        if (typeof handler !== "function") {
          throw new Error("Event handler is undefined.");
        }
        await handler(...args);
      } catch (error) {
        console.error("Event handler error:", error);
        toast.error(errorMessage);
      }
    };
  }, []);
}

/* ---------------------------------------------------
   HERO SECTION — redesigned
--------------------------------------------------- */
function ScrollingVideos() {
  const firstVideo = useMemo(() => {
    const modules = import.meta.glob(
      "../assets/Home/video/*.{mp4,webm,ogg,mov,MP4,WEBM,OGG,MOV}",
      { eager: true, import: "default" }
    );
    const videoEntries = Object.entries(modules).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    return videoEntries.length ? videoEntries[0][1] : null;
  }, []);

  return (
    <section className="home-hero">
      <div className="home-video-wrapper">
        {firstVideo ? (
          <div className="home-video-single">
            <video
              className="home-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={firstVideo} />
            </video>
          </div>
        ) : (
          <div className="home-video-fallback">
            No videos found in src/assets/Home/video
          </div>
        )}

        <div className="home-video-overlay"></div>

        {/* Floating social proof badge */}
        <div className="home-hero-badge home-swipe-up home-swipe-delay-1">
          <span className="home-hero-badge-num">500+</span>
          <span className="home-hero-badge-lbl">Students</span>
        </div>

        {/* Content anchored to bottom-left */}
        <div className="home-hero-content">
          <div className="home-hero-accent-line home-swipe-up home-swipe-delay-1"></div>
          <p className="home-hero-eyebrow home-swipe-up home-swipe-delay-1">
            Seattle's Premier Dance Academy
          </p>
          <h1 className="home-hero-title home-swipe-up home-swipe-delay-2">
            Building <span className="home-hero-title-accent">Confidence</span>
            <br />One Dance at a Time
          </h1>
          <p className="home-hero-styles home-swipe-up home-swipe-delay-3">
            A place where every dancer belongs, grows, and performs with pride
          </p>
          <div className="home-hero-ctas home-swipe-up home-swipe-delay-4">
            <a
              href="https://form.jotform.com/232330427478153"
              target="_blank"
              rel="noopener noreferrer"
              className="home-hero-btn-primary"
            >
              Enroll Now
            </a>
            <Link to="/Classes" className="home-hero-btn-secondary">
              View Classes
            </Link>
          </div>
        </div>

        <p className="home-hero-scroll-hint">Scroll to explore ↓</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   STATS BAR — new section
--------------------------------------------------- */
function StatsBar() {
  const stats = [
    { num: "500+", label: "Students Taught" },
    { num: "10+",  label: "Years of Dance" },
    { num: "6",    label: "Dance Styles" },
    { num: "100+", label: "Performances" },
    { num: "4.9★", label: "Google Rating" },
  ];

  return (
    <section className="home-stats-bar" aria-label="Key statistics">
      {stats.map((s) => (
        <div key={s.label} className="home-stat-item">
          <span className="home-stat-num">{s.num}</span>
          <span className="home-stat-lbl">{s.label}</span>
        </div>
      ))}
    </section>
  );
}

/* ---------------------------------------------------
   FOUNDER SECTION — dark theme
--------------------------------------------------- */
function FounderSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const safeEventHandler = useSafeEventHandler();

  const founderImage = useMemo(() => {
    const images = import.meta.glob(
      "../assets/Home/Founder photo/*.{png,jpg,jpeg,webp,avif,svg,JPG,JPEG,PNG,WEBP,AVIF,SVG}",
      { eager: true, import: "default" }
    );
    const imageList = Object.values(images);
    return imageList.length ? imageList[0] : "";
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const handleIntersection = safeEventHandler(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentSection);
        }
      },
      "Unable to update founder section visibility."
    );

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.4,
    });

    observer.observe(currentSection);
    return () => observer.disconnect();
  }, [safeEventHandler]);

  return (
    <section ref={sectionRef} className="home-founder-section">
      <div className="home-founder-wrapper">
        {/* Photo block */}
        <div
          className={`home-founder-photo-block ${
            isVisible ? "home-founder-photo-show" : "home-founder-photo-hidden"
          }`}
        >
          {founderImage ? (
            <img
              src={founderImage}
              alt="Valli Arunagiri — Founder of Chennai Beats"
              className="home-founder-photo"
            />
          ) : (
            <div className="home-founder-photo-placeholder">Founder Photo</div>
          )}
          <div
            className={`home-founder-name ${
              isVisible ? "home-founder-name-show" : "home-founder-name-hidden"
            }`}
          >
            <span className="home-founder-name-text">Valli Arunagiri</span>
            <span className="home-founder-name-role">Founder &amp; Lead Instructor</span>
          </div>
        </div>

        {/* Content */}
        <div
          className={`home-founder-content ${
            isVisible ? "home-founder-content-show" : "home-founder-content-hidden"
          }`}
        >
          <p className="home-founder-eyebrow">Our Story</p>
          <h2 className="home-founder-title">
            Passion turned into{" "}
            <span className="home-founder-title-accent">purpose</span>
          </h2>
          <p className="home-founder-text">
            Founded in 2011 by Valli Arunagiri, Chennai Beats was created to
            inspire and empower dancers through passion, discipline, and
            creativity. Our academy nurtures talent, builds confidence, and
            provides opportunities for students to perform and compete on
            prestigious stages — shaping them into confident and versatile
            performers.
          </p>
          <Link to="/About" className="home-founder-button">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   SERVICES SECTION — unchanged logic, refreshed styling
--------------------------------------------------- */
const sortMedia = (modules) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);

function useAutoSlide(images, delay = 2000) {
  const [index, setIndex] = useState(0);
  const safeEventHandler = useSafeEventHandler();

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const handleSlide = safeEventHandler(
      () => {
        setIndex((prev) => (prev + 1) % images.length);
      },
      "Unable to update image slider."
    );

    const interval = setInterval(handleSlide, delay);
    return () => clearInterval(interval);
  }, [images, delay, safeEventHandler]);

  return index;
}

function usePreloadImages(images) {
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src) => {
      try {
        const img = new Image();
        img.src = src;
      } catch (error) {
        console.error("Image preload error:", error);
      }
    });
  }, [images]);
}

function HomeServiceImageCard({ images, index, alt, fallbackText }) {
  usePreloadImages(images);

  return (
    <div className="home-service-card-media">
      {images.length > 0 ? (
        <img
          src={images[index]}
          alt={alt}
          className="home-service-card-image"
          draggable="false"
        />
      ) : (
        <div className="home-service-card-fallback">{fallbackText}</div>
      )}
    </div>
  );
}

function ServiceCard({
  title,
  topLine,
  bottomLine,
  description,
  images,
  accentClass,
  align = "left",
  offsetClass = "",
  fallbackText,
  switchDelay = 2000,
  enrollLink,
}) {
  const imageIndex = useAutoSlide(images, switchDelay);

  return (
    <article className={`home-service-card ${offsetClass}`}>
      <HomeServiceImageCard
        images={images}
        index={imageIndex}
        alt={title}
        fallbackText={fallbackText}
      />
      <div
        className={`home-service-card-content ${accentClass} ${
          align === "right" ? "align-right" : "align-left"
        }`}
      >
        <div className="home-service-card-meta">
          <span>{topLine}</span>
          <span>{bottomLine}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <a
          href={enrollLink}
          target="_blank"
          rel="noopener noreferrer"
          className="home-service-enroll-btn"
        >
          Enroll Now
        </a>
        <div className="home-service-card-arrow" aria-hidden="true" />
      </div>
    </article>
  );
}

function ServicesSection() {
  const SLIDE_DELAY = 2000;

  const corporateImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Home/Corporate Events/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const weddingImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Home/Wedding Choreography/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const workshopImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Home/Dance Workshops/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const costumeImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Home/Costume Rental/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const kpopImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Home/K-pop/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const services = [
    {
      title: "Corporate Events",
      topLine: "TEAM ENERGY",
      bottomLine: "LIVE SHOWS",
      description:
        "Transform your workplace with high-energy dance experiences that refresh your team, reduce stress, and bring a positive shift in mindset. We help your employees relax, reconnect, and return with renewed energy for better productivity and growth.",
      images: corporateImages,
      accentClass: "home-service-accent-red",
      align: "left",
      offsetClass: "home-offset-up",
      fallbackText: "No corporate event images found",
      switchDelay: SLIDE_DELAY,
      enrollLink: "https://form.jotform.com/232330427478153",
    },
    {
      title: "Wedding Choreography",
      topLine: "COUPLE • FAMILY",
      bottomLine: "SPECIAL MOMENTS",
      description:
        "We turn your wedding moments into unforgettable memories. From beginners to non-dancers, we help your entire family—including parents and cousins—come together on the dance floor and create joyful, fun-filled performances you'll cherish forever.",
      images: weddingImages,
      accentClass: "home-service-accent-pink",
      align: "right",
      offsetClass: "home-offset-down",
      fallbackText: "No wedding choreography images found",
      switchDelay: SLIDE_DELAY,
      enrollLink: "https://form.jotform.com/232330427478153",
    },
    {
      title: "Dance Workshops",
      topLine: "BOLLYWOOD • FOLK",
      bottomLine: "LEARN & PERFORM",
      description:
        "Feel the Beat. Move with Us. We bring the energy, you bring the steps—and together, the whole group dances as one!",
      images: workshopImages,
      accentClass: "home-service-accent-orange",
      align: "left",
      offsetClass: "home-offset-up",
      fallbackText: "No workshop images found",
      switchDelay: SLIDE_DELAY,
      enrollLink: "https://form.jotform.com/2323304274781534",
    },
    {
      title: "Costume Rental",
      topLine: "STAGE READY",
      bottomLine: "STYLE & COLORS",
      description:
        "Step Into the Spotlight! Discover our exclusive costume rentals. Reach out now to check availability and reserve your favorite look!",
      images: costumeImages,
      accentClass: "home-service-accent-purple",
      align: "right",
      offsetClass: "home-offset-down",
      fallbackText: "No costume rental images found",
      switchDelay: SLIDE_DELAY,
      enrollLink: "https://form.jotform.com/232330427478153",
    },
    {
      title: "K-Pop Dance",
      topLine: "PRECISION • POWER",
      bottomLine: "TRENDING MOVES",
      description:
        "Love K-pop? Learn iconic dance routines, improve your technique, and perform with confidence, precision, and style.",
      images: kpopImages,
      accentClass: "home-service-accent-cyan",
      align: "left",
      offsetClass: "home-offset-up",
      fallbackText: "No K-pop images found",
      switchDelay: SLIDE_DELAY,
      enrollLink: "https://form.jotform.com/232330427478153",
    },
  ];

  return (
    <section className="home-services-poster-section" id="dance-services">
      <div className="home-services-heading">
        <span className="home-services-tag">OUR SERVICES</span>
        <h2>Move. Perform. Celebrate.</h2>
        <p>
          Discover our signature dance services crafted for events,
          celebrations, workshops, rentals, and trending performance styles.
        </p>
      </div>
      <div className="home-services-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   INSTRUCTOR SECTION
--------------------------------------------------- */
function InstructorSection() {
  function useInView(threshold = 0.3) {
    const ref = useRef(null);
    const [isVisible, setVisible] = useState(false);
    const safeEventHandler = useSafeEventHandler();

    useEffect(() => {
      const handleIntersection = safeEventHandler(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisible(true);
          }
        },
        "Unable to update instructor section visibility."
      );

      const observer = new IntersectionObserver(handleIntersection, {
        threshold,
      });

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [threshold, safeEventHandler]);

    return { ref, isVisible };
  }

  const { ref, isVisible } = useInView();

  const images = import.meta.glob("../assets/Home/Instructors Photo/*.{png,jpg,jpeg}", {
    eager: true,
  });

  const instructors = Object.entries(images).map(([path, module]) => {
    const fileName = path.split("/").pop().split(".")[0];
    const name = fileName
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { name, src: module.default };
  });

  return (
    <section className="home-instructors-section" ref={ref}>
      <h2
        className={`home-instructor-title home-instructor-reveal ${
          isVisible ? "show" : ""
        }`}
      >
        Our Instructors
      </h2>
      <p
        className={`home-instructor-text home-instructor-reveal ${
          isVisible ? "show" : ""
        }`}
      >
        Our instructors are passionate mentors dedicated to helping every
        student grow with creativity, and discipline. Beyond teaching
        choreography, our instructors focus on building strong fundamentals,
        rhythm, expression, stage presence, and cultural appreciation. Every
        class is designed to inspire a love for dance while helping students
        develop technique, confidence, teamwork, and performance skills that
        extend beyond the studio.
      </p>
      <div className="home-instructor-grid">
        {instructors.map((ins, index) => (
          <div
            key={index}
            className={`home-instructor-card home-instructor-reveal ${
              isVisible ? "show" : ""
            }`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <img src={ins.src} alt={ins.name} />
            <h3
              className={`instructor-name home-instructor-reveal-name ${
                isVisible ? "show-name" : ""
              }`}
              style={{ transitionDelay: `${index * 120 + 200}ms` }}
            >
              {ins.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   CTA SECTION — new mid-page call to action
--------------------------------------------------- */
function CtaSection() {
  return (
    <section className="home-cta-section">
      <p className="home-cta-eyebrow">Start your journey today</p>
      <h2 className="home-cta-title">Ready to feel the rhythm?</h2>
      <p className="home-cta-sub">
        Join hundreds of students who found their passion at Chennai Beats.
        <br className="home-cta-br" />
        First class is always on us.
      </p>
      <div className="home-cta-btns">
        <a
          href="https://form.jotform.com/232330427478153"
          target="_blank"
          rel="noopener noreferrer"
          className="home-cta-btn-primary"
        >
          Register for a Free Class
        </a>
        <Link to="/Contact" className="home-cta-btn-secondary">
          Talk to Us First
        </Link>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   REVIEW HIGHLIGHT
--------------------------------------------------- */
function ReviewHighlight() {
  const [index, setIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const reviews = [
    "The energy here is next level 🔥",
    "Felt confident from day one 💃",
    "Best dance community ever ✨",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    const rotateY = ((x / rect.width) - 0.5) * 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <section className="home-review-section">
      {/* Mouse glow */}
      <div
        className="home-review-glow"
        style={{ transform: `translate(${mouse.x - 200}px, ${mouse.y - 200}px)` }}
      />
      <div className="home-review-bg-glow-left" />
      <div className="home-review-bg-glow-right" />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="home-review-card"
      >
        <div className="home-review-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="home-review-star" />
          ))}
        </div>
        <h2 className="home-review-rating">4.9</h2>
        <p className="home-review-label">Google Rated</p>
        <p className="home-review-body">
          Our students and dancers love the vibe, energy, and modern
          choreography. Join a community where every step feels alive.
        </p>
        <div className="home-review-testimonial">
          <p key={index} className="home-review-quote">
            &ldquo;{reviews[index]}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   PAGE EXPORT
--------------------------------------------------- */
export default function Home() {
  return (
    <>
      <ScrollingVideos />
      <StatsBar />
      <FounderSection />
      <ServicesSection />
      <InstructorSection />
      <CtaSection />
      <ReviewHighlight />
    </>
  );
}
