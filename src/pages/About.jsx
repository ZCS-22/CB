import { motion } from "framer-motion";
import logo from "../assets/CB_Logo/YT circle.png";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

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

/*founder section */
function FounderSection() {
  const safeEventHandler = useSafeEventHandler();

  const founderImg = useMemo(() => {
    try {
      const images = import.meta.glob(
        "../assets/About/Founder photo/*.{png,jpg,jpeg,webp}",
        {
          eager: true,
          import: "default",
        }
      );

      return Object.values(images)[0];
    } catch (error) {
      console.error("Failed to load founder image:", error);
      return "";
    }
  }, []);

  const storyVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: -120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2 },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, x: 120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2 },
    },
  };

  const nameVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.8 },
    },
  };

  const handleViewportEnter = safeEventHandler(
    () => {
      // keep original behavior unchanged
    },
    "Unable to process section animation."
  );

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Founder Photo */}
        <motion.div
          className="founder-image"
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onViewportEnter={handleViewportEnter}
        >
          <motion.h3
            className="our-story-title"
            variants={storyVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onViewportEnter={handleViewportEnter}
          >
            Our Story
          </motion.h3>

          <img src={founderImg} alt="Founder" />

          <motion.h2
            className="founder-name"
            variants={nameVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onViewportEnter={handleViewportEnter}
          >
            Valli Arunagiri
          </motion.h2>
        </motion.div>

        {/* Content */}
        <motion.div
          className="about-content"
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onViewportEnter={handleViewportEnter}
        >
          <img src={logo} className="about-bg-logo" alt="logo" />

          <p>
            Chennai Beats is one of the most distinguished Dance Classes in Renton,
            Redmond and Bellevue, WA. We specialize in Kuthu style, South Indian
            Folk dance, Bollywood Dance and Kollywood (Tamil & Telugu) dance.

            We have been consistently dancing, choreographing in and around the
            Austin area for 4 years and in Seattle for 5 years. We have consistently
            grown every year with increased participation in competitions in the
            Seattle area and humbly accepted awards at a few events as well!

            Chennai Beats' aim is to spread joy in the community through dancing.
            We not only urge every student to strive daily for their professional
            best but also support one another in fostering a sense of teamwork
            during the class wherein they become technically proficient and build
            their Self Esteem, Cooperation, Leadership Skills while Having Fun!

            Every student is inspired to find their creative self as
            “We Dance and Develop a Concept”.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/*about group photo section */
function AboutGroupPhotos() {
  const images = useMemo(() => {
    try {
      return Object.values(
        import.meta.glob("../assets/About/Group Photo/*.{png,jpg,jpeg,webp}", {
          eager: true,
          import: "default",
        })
      );
    } catch (error) {
      console.error("Failed to load group photos:", error);
      return [];
    }
  }, []);

  return (
    <section className="group-photo-section">
      <div className="group-photo-heading">
        <h2>Our Dance Family</h2>
        <p>Moments of joy, passion, and togetherness captured in every step</p>
      </div>

      <div className="group-photo-slider">
        <div className="group-photo-track">
          {images.map((img, index) => (
            <div key={index} className="group-photo-card">
              <img
                src={img}
                alt={`group-${index}`}
                loading="lazy"
              />
            </div>
          ))}

          {images.map((img, index) => (
            <div key={"dup-" + index} className="group-photo-card">
              <img
                src={img}
                alt={`group-${index}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <FounderSection />
      <AboutGroupPhotos />
    </>
  );
}