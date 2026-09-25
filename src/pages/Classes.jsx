import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import bg1 from "../assets/Classes/bg1.png";
import bg2 from "../assets/Classes/bg2.png";
import bg3 from "../assets/Classes/bg3.png";
import bg4 from "../assets/Classes/bg4.png";

/* ---------------------------------------------------
   COMMON HELPERS
--------------------------------------------------- */
function useInViewOnce(threshold = 0.45) {
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

const sortMedia = (modules) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);

function useAutoSlide(images, delay = 2000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images, delay]);

  return index;
}

function ImageCard({ images, index, alt, fallbackText }) {
  return (
    <div className="classes-images">
      {images.length > 0 ? (
        <img src={images[index]} alt={alt} className="classes-image-photo" />
      ) : (
        <div className="classes-image-fallback">{fallbackText}</div>
      )}
    </div>
  );
}

/* ---------------------------------------------------
   OFFLINE CLASSES SECTION
--------------------------------------------------- */
function OffLineClasses() {
  const SLIDE_DELAY = 2000;

  const bollywoodImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Classes/Bollywood Dance/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const folkImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Classes/South Indian Folk Dance/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const kuthuImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Classes/Tamil Nadu Kuthu Dance/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const freestyleImages = useMemo(
    () =>
      sortMedia(
        import.meta.glob(
          "../assets/Classes/Freestyle/*.{jpg,png,jpeg,webp,JPG,PNG,JPEG,WEBP}",
          { eager: true, import: "default" }
        )
      ),
    []
  );

  const bollywoodIndex = useAutoSlide(bollywoodImages, SLIDE_DELAY);
  const folkIndex = useAutoSlide(folkImages, SLIDE_DELAY);
  const kuthuIndex = useAutoSlide(kuthuImages, SLIDE_DELAY);
  const freestyleIndex = useAutoSlide(freestyleImages, SLIDE_DELAY);

  const [bollywoodTextRef, bollywoodVisible] = useInViewOnce(0.25);
  const [folkTextRef, folkVisible] = useInViewOnce(0.25);
  const [kuthuTextRef, kuthuVisible] = useInViewOnce(0.25);
  const [freestyleTextRef, freestyleVisible] = useInViewOnce(0.25);
  const [heroRef, heroVisible] = useInViewOnce(0.15);

  return (
    <>
      <section ref={heroRef} className="classes-hero">
        <h1
          className={
            heroVisible
              ? "classes-swipe-up classes-hero-title-delay"
              : "classes-text-hidden"
          }
        >
          <span className="classes-title">Move. Learn. Shine.</span>
        </h1>

        <p
          className={
            heroVisible
              ? "classes-swipe-up classes-hero-caption-delay classes-caption"
              : "classes-text-hidden"
          }
        >
          From beginners to pros, our classes help you build confidence, master
          techniques, and express yourself through dance.
        </p>

        <a
          href="https://form.jotform.com/232330427478153"
          target="_blank"
          rel="noreferrer"
          className={
            heroVisible
              ? "classes-registration-link classes-swipe-up classes-hero-link-delay"
              : "classes-text-hidden"
          }
        >
          Registration
        </a>
      </section>

      <section className="classes-sections">
        <div
          className="classes-section classes-bg-section classes-bollywood-bg"
          style={{ "--class-bg": `url(${bg1})` }}
        >
          <ImageCard
            images={bollywoodImages}
            index={bollywoodIndex}
            alt="Bollywood Dance"
            fallbackText="No Bollywood dance images found"
          />

          <div ref={bollywoodTextRef} className="classes-text">
            <h2
              className={
                bollywoodVisible
                  ? "classes-swipe-fade-right-left classes-heading-delay"
                  : "classes-text-hidden"
              }
            >
              <em>The</em> <strong>Bollywood Dance</strong>
              <small>Energy. Expression. Entertainment.</small>
            </h2>

            <p
              className={
                bollywoodVisible
                  ? "classes-swipe-fade-right-left classes-text-delay"
                  : "classes-text-hidden"
              }
            >
              Experience the excitement of Bollywood through vibrant routines,
              expressive movements, and dynamic performances that build
              confidence, rhythm, and stage presence.
            </p>

            <Link
              to="/contact"
              className="classes-know-more classes-know-more-right"
            >
              Know More
            </Link>
          </div>
        </div>

        <div
          className="classes-section reverse classes-bg-section classes-folk-bg"
          style={{ "--class-bg": `url(${bg2})` }}
        >
          <ImageCard
            images={folkImages}
            index={folkIndex}
            alt="South Indian Folk Dance"
            fallbackText="No South Indian folk dance images found"
          />

          <div ref={folkTextRef} className="classes-text">
            <h2
              className={
                folkVisible
                  ? "classes-swipe-fade-left-right classes-heading-delay"
                  : "classes-text-hidden"
              }
            >
              <em>The</em> <strong>South Indian Folk Dance</strong>
              <small>Tradition in Every Step</small>
            </h2>

            <p
              className={
                folkVisible
                  ? "classes-swipe-fade-left-right classes-text-delay"
                  : "classes-text-hidden"
              }
            >
              Discover the beauty of South Indian folk dance with classes that
              celebrate culture, coordination, and graceful storytelling through
              traditional rhythm and movement.
            </p>

            <Link
              to="/contact"
              className="classes-know-more classes-know-more-left"
            >
              Know More
            </Link>
          </div>
        </div>

        <div
          className="classes-section classes-bg-section classes-kuthu-bg"
          style={{ "--class-bg": `url(${bg3})` }}
        >
          <ImageCard
            images={kuthuImages}
            index={kuthuIndex}
            alt="Tamil Nadu Kuthu Dance"
            fallbackText="No Tamil Nadu kuthu dance images found"
          />

          <div ref={kuthuTextRef} className="classes-text">
            <h2
              className={
                kuthuVisible
                  ? "classes-swipe-fade-right-left classes-heading-delay"
                  : "classes-text-hidden"
              }
            >
              <em>The</em> <strong>Tamil Nadu Kuthu Dance</strong>
              <small>Powerful Moves, Local Spirit</small>
            </h2>

            <p
              className={
                kuthuVisible
                  ? "classes-swipe-fade-right-left classes-text-delay"
                  : "classes-text-hidden"
              }
            >
              Learn the bold and high-energy style of Tamil Nadu Kuthu dance,
              designed to improve timing, body control, and expressive
              performance with authentic regional flair.
            </p>

            <Link
              to="/contact"
              className="classes-know-more classes-know-more-right"
            >
              Know More
            </Link>
          </div>
        </div>

        <div
          className="classes-section reverse classes-bg-section classes-freestyle-bg"
          style={{ "--class-bg": `url(${bg4})` }}
        >
          <ImageCard
            images={freestyleImages}
            index={freestyleIndex}
            alt="Freestyle Dance"
            fallbackText="No freestyle dance images found"
          />

          <div ref={freestyleTextRef} className="classes-text">
            <h2
              className={
                freestyleVisible
                  ? "classes-swipe-fade-left-right classes-heading-delay"
                  : "classes-text-hidden"
              }
            >
              <em>The</em> <strong>Freestyle</strong>
              <small>Your Style, Your Expression</small>
            </h2>

            <p
              className={
                freestyleVisible
                  ? "classes-swipe-fade-left-right classes-text-delay"
                  : "classes-text-hidden"
              }
            >
              Unleash your creativity with freestyle classes that encourage
              self-expression, musicality, and confidence while helping dancers
              develop their own unique performance style.
            </p>

            <Link
              to="/contact"
              className="classes-know-more classes-know-more-left"
            >
              Know More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------
   SCHEDULE SECTION
--------------------------------------------------- */
function ClassScheduleSection() {
  const [sectionRef, sectionVisible] = useInViewOnce(0.2);

  return (
    <section ref={sectionRef} className="classes-schedule-section">
      <div className="classes-schedule-container">
        <div
          className={`classes-schedule-header ${
            sectionVisible ? "schedule-show" : ""
          }`}
        >
          <h2 className="classes-schedule-title">Grab Your Slot !</h2>
          <p className="classes-schedule-subtitle">
            Fee is $100 per month includes 4 sessions
          </p>
        </div>

        <div
          className={`classes-contact-cta ${
            sectionVisible ? "schedule-show" : ""
          }`}
        >
          <div className="classes-contact-cta-inner">
            <div className="classes-contact-cta-icon">
              <i className="bi bi-chat-heart-fill"></i>
            </div>
            <h3 className="classes-contact-cta-title">
              Interested in joining a class?
            </h3>
            <p className="classes-contact-cta-text">
              Share your details and we&apos;ll get back to you with available
              slots, timings, and the right class for your age group.
            </p>
            <a
              href="https://form.jotform.com/232330427478153"
              target="_blank"
              rel="noopener noreferrer"
              className="classes-contact-cta-btn"
            >
              Fill in Your Details →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   ONLINE CLASSES SECTION
--------------------------------------------------- */
function OnlineClasses() {
  const [onlineSectionRef, onlineVisible] = useInViewOnce(0.2);

  return (
    <section ref={onlineSectionRef} className="classes-online-wrapper">
      <div className="classes-online-section">
        <div className="classes-online-image-box">
          <img
            src={bg4}
            alt="Online dance class"
            className="classes-online-image"
          />
        </div>

        <div className="classes-online-content">
          <h2
            className={
              onlineVisible
                ? "classes-swipe-fade-right-left classes-heading-delay"
                : "classes-online-hidden-right"
            }
          >
            LEARN DANCE ONLINE !
          </h2>

          <p
            className={
              onlineVisible
                ? "classes-swipe-fade-right-left classes-text-delay"
                : "classes-online-hidden-right"
            }
          >
            Join Student Learning Virtually! Students get active and learn to
            dance from your home. Classes available for Bollywood, South Indian
            Folk Dance, Tamil Nadu Kuthu and Kollywood freestyle classes. We
            have Classes for the Entire Family, Kids 3+ to Adults.
          </p>

          <div
            className={
              onlineVisible
                ? "classes-online-tuition-box classes-swipe-fade-right-left classes-text-delay-2"
                : "classes-online-tuition-box classes-online-hidden-right"
            }
          >
            <h3>VIRTUAL CLASS TUITION</h3>
            <p>
              <strong>1 Class Per Week on Weekends</strong> $15 /class
            </p>
            <p>60-Minute Online Lesson</p>
            <p>1 Dance Style Per Week</p>
          </div>

          <ul
            className={
              onlineVisible
                ? "classes-online-list classes-swipe-fade-right-left classes-text-delay-3"
                : "classes-online-list classes-online-hidden-right"
            }
          >
            <li>
              Choose from Bollywood, Bollyhop, Kathak, Bhangra & Bharatnatyam
            </li>
            <li>Live Interactive Training</li>
            <li>Access Practice Videos</li>
          </ul>

          <a
            href="https://form.jotform.com/232330427478153"
            target="_blank"
            rel="noreferrer"
            className={
              onlineVisible
                ? "classes-registration-link classes-online-registration classes-swipe-fade-right-left classes-text-delay-4"
                : "classes-registration-link classes-online-registration classes-online-hidden-right"
            }
          >
            Registration
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------- */
export default function Classes() {
  return (
    <div className="classes-page">
      <OffLineClasses />
      <ClassScheduleSection />
      <OnlineClasses />
    </div>
  );
}