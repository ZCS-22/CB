import { useEffect, useMemo, useRef, useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/* ---------------------------------------------------
   COSTUME DATA
--------------------------------------------------- */
const costumeItems = [
  { id: "adult fusion-01", category: "adult fusion", title: "adult fusion style 1", folder: "adult fusion/style1", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-02", category: "adult fusion", title: "adult fusion style 2", folder: "adult fusion/style2", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-03", category: "adult fusion", title: "adult fusion style 3", folder: "adult fusion/style3", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-04", category: "adult fusion", title: "adult fusion style 4", folder: "adult fusion/style4", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-05", category: "adult fusion", title: "adult fusion style 5", folder: "adult fusion/style5", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-06", category: "adult fusion", title: "adult fusion style 6", folder: "adult fusion/style6", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-07", category: "adult fusion", title: "adult fusion style 7", folder: "adult fusion/style7", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-08", category: "adult fusion", title: "adult fusion style 8", folder: "adult fusion/style8", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult fusion-09", category: "adult fusion", title: "adult fusion style 9", folder: "adult fusion/style9", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  
  { id: "adult traditional-01", category: "adult traditional", title: "adult traditional style 1", folder: "adult traditional/style1", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-02", category: "adult traditional", title: "adult traditional style 2", folder: "adult traditional/style2", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-03", category: "adult traditional", title: "adult traditional style 3", folder: "adult traditional/style3", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-04", category: "adult traditional", title: "adult traditional style 4", folder: "adult traditional/style4", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-05", category: "adult traditional", title: "adult traditional style 5", folder: "adult traditional/style5", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-06", category: "adult traditional", title: "adult traditional style 6", folder: "adult traditional/style6", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "adult traditional-07", category: "adult traditional", title: "adult traditional style 7", folder: "adult traditional/style7", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  
  { id: "kids fusion-01", category: "kids fusion", title: "kids fusion style 1", folder: "kids fusion/style1", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-02", category: "kids fusion", title: "kids fusion style 2", folder: "kids fusion/style2", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-03", category: "kids fusion", title: "kids fusion style 3", folder: "kids fusion/style3", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-04", category: "kids fusion", title: "kids fusion style 4", folder: "kids fusion/style4", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-05", category: "kids fusion", title: "kids fusion style 5", folder: "kids fusion/style5", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-06", category: "kids fusion", title: "kids fusion style 6", folder: "kids fusion/style6", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-07", category: "kids fusion", title: "kids fusion style 7", folder: "kids fusion/style7", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-08", category: "kids fusion", title: "kids fusion style 8", folder: "kids fusion/style8", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-09", category: "kids fusion", title: "kids fusion style 9", folder: "kids fusion/style9", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-10", category: "kids fusion", title: "kids fusion style 10", folder: "kids fusion/style10", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-11", category: "kids fusion", title: "kids fusion style 11", folder: "kids fusion/style11", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-12", category: "kids fusion", title: "kids fusion style 12", folder: "kids fusion/style12", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-13", category: "kids fusion", title: "kids fusion style 13", folder: "kids fusion/style13", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids fusion-14", category: "kids fusion", title: "kids fusion style 14", folder: "kids fusion/style14", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },

  { id: "kids traditional-01", category: "kids traditional", title: "kids traditional style 1", folder: "kids traditional/style1", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids traditional-02", category: "kids traditional", title: "kids traditional style 2", folder: "kids traditional/style2", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "kids traditional-03", category: "kids traditional", title: "kids traditional style 3", folder: "kids traditional/style3", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },

  { id: "teen fusion-01", category: "teen fusion", title: "teen fusion style 1", folder: "teen fusion/style1", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-02", category: "teen fusion", title: "teen fusion style 2", folder: "teen fusion/style2", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-03", category: "teen fusion", title: "teen fusion style 3", folder: "teen fusion/style3", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-04", category: "teen fusion", title: "teen fusion style 4", folder: "teen fusion/style4", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-05", category: "teen fusion", title: "teen fusion style 5", folder: "teen fusion/style5", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-06", category: "teen fusion", title: "teen fusion style 6", folder: "teen fusion/style6", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-07", category: "teen fusion", title: "teen fusion style 7", folder: "teen fusion/style7", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  { id: "teen fusion-08", category: "teen fusion", title: "teen fusion style 8", folder: "teen fusion/style8", price: "Sale & Rent Detail ⬇", desc: "Traditional Bharatanatyam costume", sizes: { Small: 2, Medium: 3, Large: 2, XL: 1 } },
  
];

/* ---------------------------------------------------
   LAZY IMAGE IMPORTS
--------------------------------------------------- */
const imageModules = import.meta.glob(
  "../assets/CostumeRental/**/*.{webp,jpg,jpeg,png,JPG,JPEG,PNG,WEBP}",
  { import: "default" }
);

/* ---------------------------------------------------
   HELPERS
--------------------------------------------------- */
function useInViewOnce(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin: "160px 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, threshold]);

  return [ref, visible];
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

function buildGroupedLoaders(modules) {
  const grouped = {};

  Object.entries(modules).forEach(([path, loader]) => {
    const parts = path.split("/");
    const costumeFolder = parts[parts.length - 2];
    const categoryFolder = parts[parts.length - 3];
    const folderKey = `${categoryFolder}/${costumeFolder}`;

    if (!grouped[folderKey]) {
      grouped[folderKey] = [];
    }

    grouped[folderKey].push({ path, loader });
  });

  Object.keys(grouped).forEach((folderKey) => {
    grouped[folderKey].sort((a, b) => a.path.localeCompare(b.path));
    grouped[folderKey] = grouped[folderKey].map((item) => item.loader);
  });

  return grouped;
}

function groupCostumesByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
}

function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

/* ---------------------------------------------------
   LIGHTBOX
--------------------------------------------------- */
function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="costume-lightbox" onClick={onClose}>
      <button
        type="button"
        className="costume-lightbox-close"
        onClick={onClose}
        aria-label="Close image preview"
      >
        &times;
      </button>

      <div
        className="costume-lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={src} alt={alt} className="costume-lightbox-image" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   MAIN PAGE
--------------------------------------------------- */
export default function CostumeRental() {
  const groupedLoaders = useMemo(() => buildGroupedLoaders(imageModules), []);
  const costumesByCategory = useMemo(
    () => groupCostumesByCategory(costumeItems),
    []
  );

  return (
    <div className="costume-page">
      <section className="costume-hero">
        <h1>Costume Rental Service</h1>
        <p>
          Choose your dance costume and explore available designs for stage
          performances and cultural events.
        </p>
      </section>

      <section className="costume-categories">
        <h2 className="costume-title">Costume Categories</h2>

        {Object.entries(costumesByCategory).map(([category, costumes]) => (
          <div key={category} className="costume-category-block">
            <h3 className="costume-category-title">{category}</h3>

            <div className="costume-grid">
              {costumes.map((costume) => (
                <CostumeCard
                  key={costume.id}
                  costume={costume}
                  imageLoaders={groupedLoaders[costume.folder] || []}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="costume-cta-section">
        <h2>Need Costume for Your Performance?</h2>
        <p>Contact us now and book your dance costume.</p>

        <Link to="/contact" className="costume-cta-btn">
          Contact Now
        </Link>
      </section>
    </div>
  );
}

/* ---------------------------------------------------
   CARD
--------------------------------------------------- */
const CostumeCard = memo(function CostumeCard({ costume, imageLoaders }) {
  const [cardRef, cardVisible] = useInViewOnce(0.1);
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const safeEventHandler = useSafeEventHandler();

  useEffect(() => {
    if (!cardVisible || isLoaded || imageLoaders.length === 0) return;

    let active = true;

    const loadImages = async () => {
      try {
        const loaded = await Promise.all(
          imageLoaders.map((loader, index) => {
            if (typeof loader !== "function") {
              throw new Error(
                `Invalid image loader at index ${index} for ${costume.title}`
              );
            }
            return loader();
          })
        );

        if (active) {
          setImages(loaded);
          setIsLoaded(true);
          preloadImage(loaded[0]);
          preloadImage(loaded[1]);
        }
      } catch (error) {
        console.error(`Failed to load images for ${costume.title}:`, error);
        toast.error(`Unable to load images for ${costume.title}.`);
      }
    };

    loadImages();

    return () => {
      active = false;
    };
  }, [cardVisible, imageLoaders, isLoaded, costume.title]);

  useEffect(() => {
    if (current >= images.length && images.length > 0) {
      setCurrent(0);
    }
  }, [images, current]);

  useEffect(() => {
    if (images.length <= 1) return;

    const nextIndex = (current + 1) % images.length;
    const prevIndex = (current - 1 + images.length) % images.length;

    preloadImage(images[nextIndex]);
    preloadImage(images[prevIndex]);
  }, [current, images]);

  const handlePrev = useCallback(
    (event) => {
      event.stopPropagation();
      if (images.length <= 1) return;
      setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleNext = useCallback(
    (event) => {
      event.stopPropagation();
      if (images.length <= 1) return;
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  const handleOpenLightbox = useCallback(
    (event) => {
      event.stopPropagation();
      if (images.length === 0) return;
      setLightboxOpen(true);
    },
    [images.length]
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handleSafePrev = safeEventHandler(
    handlePrev,
    "Unable to show previous image."
  );

  const handleSafeNext = safeEventHandler(
    handleNext,
    "Unable to show next image."
  );

  const handleSafeOpenLightbox = safeEventHandler(
    handleOpenLightbox,
    "Unable to open full image."
  );

  return (
    <>
      <article ref={cardRef} className="costume-card">
        <div className="costume-image-wrap">
          {images.length > 0 ? (
            <button
              type="button"
              className="costume-image-button"
              onClick={handleSafeOpenLightbox}
              aria-label={`Open full image for ${costume.title}`}
            >
              <img
                src={images[current]}
                alt={costume.title}
                loading="lazy"
                decoding="async"
                className="costume-image"
              />
            </button>
          ) : (
            <div className="costume-image-placeholder">
              <span>{costume.title}</span>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="costume-nav-btn costume-nav-btn-left"
                onClick={handleSafePrev}
                aria-label={`Previous image for ${costume.title}`}
              >
                &#10094;
              </button>

              <button
                type="button"
                className="costume-nav-btn costume-nav-btn-right"
                onClick={handleSafeNext}
                aria-label={`Next image for ${costume.title}`}
              >
                &#10095;
              </button>

              <div className="costume-image-count">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        <div className="costume-card-content">
          <h3>{costume.title}</h3>
          <p>{costume.desc}</p>

          <div className="costume-price-wrap">
            <span>{costume.price}</span>

            <div className="costume-hover-overlay">
              <div className="costume-hover-box">
                <h4>Available Sizes</h4>

                <ul>
                  {Object.entries(costume.sizes).map(([size, count]) => (
                    <li key={size}>
                      <span>{size}</span>
                      <span>{count} costumes</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="costume-book-btn">
                  For booking contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {lightboxOpen && images[current] && (
        <ImageLightbox
          src={images[current]}
          alt={costume.title}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
});