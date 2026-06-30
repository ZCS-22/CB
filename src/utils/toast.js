import toast from "react-hot-toast";

// ✅ Success Toast
export const showSuccess = (message) => {
  toast.success(message, {
    className: "toast-success",
  });
};

// ❌ Error Toast
export const showError = (message) => {
  toast.error(message, {
    className: "toast-error",
  });
};

// 🔔 Normal Toast
export const showToast = (message) => {
  toast(message, {
    className: "toast-normal",
  });
};