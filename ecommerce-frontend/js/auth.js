// ─── Auth Functions ───────────────────────────────────────────────────────────

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return res.data;
}

async function register(name, email, password) {
  const res = await api.post('/auth/register', { name, email, password, role: 'user' });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return res.data;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = window.location.pathname.includes('/admin/') ? '../login.html' : 'login.html';
}

async function forgotPassword(email) {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
}

async function resetPassword(token, password) {
  const res = await api.put(`/auth/reset-password/${token}`, { password });
  return res.data;
}

async function updateProfile(name, email) {
  const res = await api.put('/auth/update-profile', { name, email });
  const updated = res.data.data || res.data;
  const user = getUser();
  localStorage.setItem('user', JSON.stringify({ ...user, ...updated }));
  return res.data;
}

async function updatePassword(currentPassword, newPassword) {
  const res = await api.put('/auth/update-password', { currentPassword, newPassword });
  return res.data;
}

async function getMe() {
  const res = await api.get('/auth/me');
  return res.data.data || res.data;
}

// ─── Navbar Auth UI ───────────────────────────────────────────────────────────
function updateNavbarAuth() {
  const user = getUser();
  const authArea = document.getElementById('nav-auth');
  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <div class="relative group">
        <button class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-sm font-medium">
          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            ${user.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <span class="hidden md:block">${user.name || 'Account'}</span>
          <i class="fa-solid fa-chevron-down text-xs text-white/50"></i>
        </button>
        <div class="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl bg-[#111111] border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <a href="${getProfilePath()}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <i class="fa-solid fa-user w-4"></i> Profile
          </a>
          ${isAdmin() ? `<a href="${getAdminPath()}" class="flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-colors"><i class="fa-solid fa-shield-halved w-4"></i> Admin Panel</a>` : ''}
          <hr class="my-1 border-white/10">
          <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-left">
            <i class="fa-solid fa-right-from-bracket w-4"></i> Logout
          </button>
        </div>
      </div>`;
  } else {
    authArea.innerHTML = `
      <a href="${getLoginPath()}" class="px-5 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">Login</a>
      <a href="${getRegisterPath()}" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all duration-300 shadow-lg shadow-indigo-500/20">
        Get Started
      </a>`;
  }
}

function getProfilePath() {
  return window.location.pathname.includes('/admin/') ? '../profile.html' : 'profile.html';
}

function getAdminPath() {
  return window.location.pathname.includes('/admin/') ? 'index.html' : 'admin/index.html';
}

function getLoginPath() {
  return window.location.pathname.includes('/admin/') ? '../login.html' : 'login.html';
}

function getRegisterPath() {
  return window.location.pathname.includes('/admin/') ? '../register.html' : 'register.html';
}
