import { Settings } from "lucide-react";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function NotFound() {
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

  const handleHomeClick = useCallback(async () => {
    // Keep original behavior unchanged.
  }, []);

  const handleSafeHomeClick = useSafeEventHandler(
    handleHomeClick,
    "Unable to go back to home right now."
  );

  return (
    <div className="notfound-container">
      <div className="notfound-gear">
        <Settings className="notfound-gear-icon" />
      </div>

      <h1 className="notfound-code">404</h1>

      <h2 className="notfound-title">Page Not Found</h2>

      <p className="notfound-text">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <a href="/" className="notfound-home-btn" onClick={handleSafeHomeClick}>
        Go Back to Home
      </a>
    </div>
  );
}