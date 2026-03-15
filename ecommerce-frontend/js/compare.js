// Product Comparison Logic
const compareState = {
  items: JSON.parse(localStorage.getItem('compareItems') || '[]'),
  maxItems: 3
};

function saveCompareState() {
  localStorage.setItem('compareItems', JSON.stringify(compareState.items));
  updateCompareUI();
}

function addToCompare(productStr) {
  try {
    const product = JSON.parse(decodeURIComponent(productStr));
    
    if (compareState.items.some(p => p._id === product._id)) {
      showToast('Product already in comparison list', 'warning');
      return;
    }

    if (compareState.items.length >= compareState.maxItems) {
      showToast(`You can compare up to ${compareState.maxItems} products`, 'error');
      return;
    }

    compareState.items.push(product);
    saveCompareState();
    showToast('Added to compare list', 'success');
  } catch (err) {
    console.error('Failed to add to compare:', err);
    showToast('Failed to add to compare', 'error');
  }
}

function removeFromCompare(productId) {
  compareState.items = compareState.items.filter(p => p._id !== productId);
  saveCompareState();
  
  // If on compare page, we might want to refresh
  if (window.location.pathname.includes('compare.html') && typeof renderComparePage === 'function') {
      renderComparePage();
  }
}

function updateCompareUI() {
  const bar = document.getElementById('compare-bar');
  if (!bar) return;

  if (compareState.items.length === 0) {
    bar.classList.add('translate-y-full');
    setTimeout(() => { bar.classList.add('hidden'); }, 300); // Wait for transition
    return;
  }

  bar.classList.remove('hidden');
  // Small delay to ensure display:block applies before transition
  setTimeout(() => { bar.classList.remove('translate-y-full'); }, 10);

  const container = document.getElementById('compare-items-container');
  const countEl = document.getElementById('compare-count');
  
  if (countEl) countEl.textContent = `${compareState.items.length} / ${compareState.maxItems}`;

  if (container) {
    container.innerHTML = compareState.items.map(p => `
      <div class="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2 min-w-[160px] max-w-[200px] shrink-0">
        <img src="${getImageUrl(p.image)}" alt="${p.name}" class="w-10 h-10 rounded-lg object-cover bg-white/5" />
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-white truncate">${p.name}</p>
          <p class="text-[10px] text-indigo-400 font-bold">${formatPrice(p.price)}</p>
        </div>
        <button onclick="removeFromCompare('${p._id}')" class="p-1.5 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors">
          <i class="fa-solid fa-times text-xs"></i>
        </button>
      </div>
    `).join('');
  }
}

// Global Clear
function clearCompare() {
    compareState.items = [];
    saveCompareState();
    
    if (window.location.pathname.includes('compare.html') && typeof renderComparePage === 'function') {
        renderComparePage();
    }
}

// Add Compare Bar HTML to DOM dynamically if not exists
function injectCompareBar() {
  if (document.getElementById('compare-bar')) return;
  if (window.location.pathname.includes('compare.html')) return; // Don't show on compare page itself

  const html = `
    <div id="compare-bar" class="hidden translate-y-full fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out">
      <div class="bg-[#111111]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div class="flex items-center gap-4 w-full md:w-auto">
              <div class="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <i class="fa-solid fa-code-compare"></i>
              </div>
              <div class="flex-1 md:flex-none">
                <h3 class="font-bold text-sm text-white">Compare Products</h3>
                <p class="text-xs text-white/50"><span id="compare-count">0</span> added</p>
              </div>
            </div>

            <div id="compare-items-container" class="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth">
              <!-- Items injected here -->
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
              <a href="compare.html" class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">
                Compare Now <i class="fa-solid fa-arrow-right"></i>
              </a>
              <button onclick="clearCompare()" class="md:hidden flex items-center justify-center p-2.5 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  
  // Custom style for scrollbar
  const style = document.createElement('style');
  style.textContent = `
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
    injectCompareBar();
    updateCompareUI();
});
