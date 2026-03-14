// ─── Admin Module ─────────────────────────────────────────────────────────────

// ─── Products CRUD ────────────────────────────────────────────────────────────
async function adminGetProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`/products?${query}`);
  return res.data;
}

async function adminCreateProduct(formData) {
  const res = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

async function adminUpdateProduct(id, formData) {
  const res = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

async function adminDeleteProduct(id) {
  const res = await api.delete(`/products/${id}`);
  return res.data;
}

// ─── Categories CRUD ──────────────────────────────────────────────────────────
async function adminGetCategories() {
  const res = await api.get('/categories');
  return res.data.data || res.data;
}

async function adminCreateCategory(name, slug) {
  const res = await api.post('/categories', { name, slug });
  return res.data;
}

async function adminDeleteCategory(id) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}

// ─── Orders ───────────────────────────────────────────────────────────────────
async function adminGetOrders() {
  const res = await api.get('/orders');
  return res.data.data || res.data;
}

async function adminUpdateOrderStatus(id, status) {
  const res = await api.put(`/orders/${id}/status`, { status });
  return res.data;
}

// ─── Stats ────────────────────────────────────────────────────────────────────
async function loadDashboardStats() {
  const [productsData, ordersData] = await Promise.allSettled([
    api.get('/products?limit=1'),
    api.get('/orders'),
  ]);

  const totalProducts = productsData.status === 'fulfilled' ? (productsData.value.data.total || 0) : 0;
  const orders = ordersData.status === 'fulfilled' ? (ordersData.value.data.data || ordersData.value.data || []) : [];

  const revenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return { totalProducts, totalOrders: orders.length, revenue, orders };
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    pending:    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shipped:    'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    delivered:  'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled:  'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const cls = map[status?.toLowerCase()] || 'bg-white/10 text-white/50';
  return `<span class="px-3 py-1 rounded-full border text-xs font-semibold ${cls}">${status || 'Unknown'}</span>`;
}
