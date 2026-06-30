import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // 👉 Trigger UI fallback
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 👉 Catch error + log + send to server
  componentDidCatch(error, info) {
    // ✅ Log in browser (for dev)
    console.error("Error:", error);
    console.error("Info:", info);

    // ✅ Send to backend (Production logging)
    fetch("/log-error", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: error.toString(),
        stack: error.stack,
        componentStack: info.componentStack,
      }),
    }).catch((err) => {
      console.error("Logging failed:", err);
    });
  }

  // 👉 Reload page
  handleReload = () => {
    window.location.reload();
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">

          <div className="error-card animate__animated animate__fadeInDown">

            {/* Icon */}
            <i className="bi bi-exclamation-triangle-fill error-icon animate__animated animate__shakeX"></i>

            {/* Title */}
            <h1 className="error-title animate__animated animate__fadeIn">
              Something went wrong
            </h1>

            {/* Message */}
            <p className="error-text animate__animated animate__fadeInUp">
              We resolve it as soon as possible.  
              Please refresh the page or try again later.
            </p>

            {/* Button */}
            <button
              onClick={this.handleReload}
              className="error-button animate__animated animate__fadeInUp"
            >
              Reload Page
            </button>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;