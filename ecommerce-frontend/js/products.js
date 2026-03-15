// ─── Products Module ──────────────────────────────────────────────────────────

async function fetchProducts(params = {}) {
  const res = await api.get('/products', { params });
  return res.data;
}

async function fetchProduct(id) {
  const res = await api.get(`/products/${id}`);
  return res.data.data || res.data;
}

async function fetchCategories() {
  const res = await api.get('/categories');
  return res.data.data || res.data;
}

// ─── Product Card HTML ────────────────────────────────────────────────────────
function createProductCard(product, animIndex = 0) {
  const inStock = product.stock > 0;
  return `
    <div class="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10" data-aos="fade-up" data-aos-delay="${animIndex * 80}">
      <div class="relative overflow-hidden aspect-square">
        <img src="${getImageUrl(product.image)}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        ${!inStock ? '<div class="absolute inset-0 bg-black/50 flex items-center justify-center"><span class="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold">Out of Stock</span></div>' : ''}
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-4">
        ${product.category ? `<span class="text-xs text-indigo-400 font-medium uppercase tracking-wider">${product.category.name || product.category}</span>` : ''}
        <h3 class="font-semibold text-white mt-1 mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          <a href="product.html?id=${product._id}">${product.name}</a>
        </h3>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xl font-bold text-indigo-400">${formatPrice(product.price)}</span>
          <div class="flex gap-2">
            <button onclick="addToCompare(encodeURIComponent(JSON.stringify({_id: '${product._id}', name: '${product.name.replace(/'/g, "\\'")}', image: '${product.image}', price: ${product.price}})))" class="flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300" title="Compare">
              <i class="fa-solid fa-code-compare text-xs"></i>
            </button>
            <button onclick="handleAddToCart('${product._id}', this)" ${!inStock ? 'disabled' : ''} class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95">
              <i class="fa-solid fa-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

async function handleAddToCart(productId, btn) {
  if (!isLoggedIn()) {
    showToast('Please login to add items to cart', 'warning');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    return;
  }
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i>';
  btn.disabled = true;
  try {
    await addToCart(productId, 1);
    showToast('Added to cart!', 'success');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    showToast(err.response?.data?.message || 'Failed to add to cart', 'error');
    btn.innerHTML = original;
    btn.disabled = false;
  }
}
