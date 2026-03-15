const ADMIN_API = "https://ecommerce-api-psi-three.vercel.app/api";

function checkAdminAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token || user.role !== "admin") {
    console.warn("Unauthorized! Redirecting to login.");
    window.location.href = "../login.html";
  }
  return token;
}

async function adminFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    "Authorization": `Bearer ${token}`
  };
  
  if (!isFormData && options.body && typeof options.body === "string") {
    headers["Content-Type"] = "application/json";
  }

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  const response = await fetch(`${ADMIN_API}${endpoint}`, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    let errorMsg = "API Error";
    try {
      const errObj = await response.json();
      errorMsg = errObj.message || errorMsg;
    } catch(e) {
      errorMsg = await response.text();
    }
    throw new Error(errorMsg);
  }
  
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (e) {
    return {};
  }
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let iconSvg = "";
  if (type === "success") {
    iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
  } else if (type === "error") {
    iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
  } else {
    iconSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';
  }

  toast.innerHTML = `<div class="toast-icon">${iconSvg}</div><div class="toast-content">${message}</div>`;
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.logout = function() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "../login.html";
};
