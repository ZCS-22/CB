import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
      <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{duration: 3000,}}
        />
        <ScrollToTop />
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-black border-t-transparent"></div>
            </div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);