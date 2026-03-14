// ─── Axios Instance with JWT Interceptor ────────────────────────────────────
const API_BASE = 'https://ecommerce-api-psi-three.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = getLoginPath();
    }
    return Promise.reject(error);
  }
);

// Determine relative path to login page
function getLoginPath() {
  const path = window.location.pathname;
  if (path.includes('/admin/')) return '../login.html';
  return 'login.html';
}

// ─── Toast Notifications ─────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const toast = document.createElement('div');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const colors = { success: 'border-green-500 text-green-400', error: 'border-red-500 text-red-400', info: 'border-indigo-500 text-indigo-400', warning: 'border-yellow-500 text-yellow-400' };

  toast.className = `flex items-center gap-3 px-5 py-4 rounded-2xl backdrop-blur-xl border bg-white/5 shadow-2xl text-white text-sm font-medium transition-all duration-500 translate-x-full opacity-0 ${colors[type]}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info} text-base"></i><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
    });
  });

  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 3500);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm';
  document.body.appendChild(container);
  return container;
}

// ─── Loading Spinner ─────────────────────────────────────────────────────────
function showSpinner(id = 'page-spinner') {
  let spinner = document.getElementById(id);
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.id = id;
    spinner.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';
    spinner.innerHTML = `<div class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>`;
    document.body.appendChild(spinner);
  }
  spinner.style.display = 'flex';
}

function hideSpinner(id = 'page-spinner') {
  const spinner = document.getElementById(id);
  if (spinner) spinner.style.display = 'none';
}

// ─── Auth Utilities ───────────────────────────────────────────────────────────
function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function requireAuth() {
  if (!isLoggedIn()) {
    const path = window.location.pathname.includes('/admin/') ? '../login.html' : 'login.html';
    window.location.href = path;
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!isLoggedIn() || !isAdmin()) {
    window.location.href = window.location.pathname.includes('/admin/') ? '../login.html' : 'login.html';
    return false;
  }
  return true;
}

// ─── Image URL Helper ─────────────────────────────────────────────────────────
function getImageUrl(filename) {
  if (!filename) return 'https://via.placeholder.com/500x500/1a1a2e/6366f1?text=No+Image';
  if (filename.startsWith('http')) return filename;
  return `https://ecommerce-api-psi-three.vercel.app/uploads/${filename}`;
}

// ─── Format Currency ──────────────────────────────────────────────────────────
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
} 