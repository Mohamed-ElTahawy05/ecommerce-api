// ─── Cart Operations ──────────────────────────────────────────────────────────

async function getCart() {
  if (!isLoggedIn()) return { items: [], total: 0 };
  const res = await api.get('/cart');
  return res.data.data || res.data;
}

async function addToCart(productId, quantity = 1) {
  if (!requireAuth()) return;
  const res = await api.post('/cart', { productId, quantity });
  await updateCartCount();
  return res.data;
}

async function removeFromCart(productId) {
  const res = await api.delete(`/cart/${productId}`);
  await updateCartCount();
  return res.data;
}

async function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  if (!isLoggedIn()) {
    badge.textContent = '0';
    badge.classList.add('hidden');
    return;
  }
  try {
    const cart = await getCart();
    const count = cart.items ? cart.items.reduce((sum, i) => sum + i.quantity, 0) : 0;
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  } catch {
    badge.classList.add('hidden');
  }
}

// ─── Render Cart Page ─────────────────────────────────────────────────────────
async function renderCartPage() {
  const container = document.getElementById('cart-items');
  const summaryEl = document.getElementById('order-summary');
  if (!container) return;

  showSpinner();
  try {
    const cart = await getCart();
    const items = cart.items || [];
    hideSpinner();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="text-center py-20">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <i class="fa-solid fa-cart-shopping text-4xl text-white/20"></i>
          </div>
          <h3 class="text-xl font-semibold text-white/50 mb-3">Your cart is empty</h3>
          <p class="text-white/30 mb-6">Add some products to get started</p>
          <a href="products.html" class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-semibold transition-all">
            <i class="fa-solid fa-arrow-left"></i> Browse Products
          </a>
        </div>`;
      if (summaryEl) summaryEl.innerHTML = '';
      return;
    }

    let subtotal = 0;
    container.innerHTML = items.map(item => {
      const price = item.product?.price || 0;
      const lineTotal = price * item.quantity;
      subtotal += lineTotal;
      return `
        <div class="cart-item flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all" data-id="${item.product?._id}">
          <img src="${getImageUrl(item.product?.image)}" alt="${item.product?.name}" class="w-20 h-20 object-cover rounded-xl flex-shrink-0">
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-white truncate">${item.product?.name || 'Product'}</h4>
            <p class="text-indigo-400 font-bold mt-1">${formatPrice(price)}</p>
            <div class="flex items-center gap-3 mt-3">
              <button onclick="changeQty('${item.product?._id}', ${item.quantity - 1})" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <i class="fa-solid fa-minus text-xs"></i>
              </button>
              <span class="font-semibold w-6 text-center">${item.quantity}</span>
              <button onclick="changeQty('${item.product?._id}', ${item.quantity + 1})" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-indigo-600 flex items-center justify-center transition-colors">
                <i class="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          </div>
          <div class="flex flex-col items-end justify-between">
            <span class="font-bold text-white">${formatPrice(lineTotal)}</span>
            <button onclick="deleteCartItem('${item.product?._id}')" class="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 flex items-center justify-center transition-colors">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </div>`;
    }).join('');

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="space-y-3 text-sm">
          <div class="flex justify-between text-white/60"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="flex justify-between text-white/60"><span>Shipping</span><span class="text-green-400">Free</span></div>
          <hr class="border-white/10">
          <div class="flex justify-between font-bold text-lg"><span>Total</span><span class="text-indigo-400">${formatPrice(subtotal)}</span></div>
        </div>
        <a href="checkout.html" class="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20">
          <i class="fa-solid fa-lock"></i> Proceed to Checkout
        </a>`;
    }
  } catch (err) {
    hideSpinner();
    container.innerHTML = `<p class="text-red-400">Failed to load cart. Please try again.</p>`;
  }
}

async function changeQty(productId, newQty) {
  if (newQty < 1) {
    await deleteCartItem(productId);
    return;
  }
  showSpinner();
  try {
    await api.post('/cart', { productId, quantity: newQty });
    await renderCartPage();
  } catch (err) {
    hideSpinner();
    showToast(err.response?.data?.message || 'Failed to update quantity', 'error');
  }
}

async function deleteCartItem(productId) {
  showSpinner();
  try {
    await removeFromCart(productId);
    showToast('Item removed from cart', 'success');
    await renderCartPage();
  } catch (err) {
    hideSpinner();
    showToast(err.response?.data?.message || 'Failed to remove item', 'error');
  }
}
