// ShopLux i18n Engine
const i18n = {
  activeLocale: localStorage.getItem('shoplux_lang') || 'en',
  translations: {},

  async init() {
    await this.loadLocale(this.activeLocale);
    this.applyDirection();
    this.applyTranslations();
    this.initSwitcher();
  },

  async loadLocale(locale) {
    try {
      const response = await fetch(`locales/${locale}.json`);
      if (!response.ok) throw new Error(`Could not load ${locale} translations`);
      this.translations = await response.json();
      this.activeLocale = locale;
      localStorage.setItem('shoplux_lang', locale);
    } catch (error) {
      console.error('i18n Load Error:', error);
      // Fallback to English if not already attempting English
      if (locale !== 'en') await this.loadLocale('en');
    }
  },

  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key; // Return key if translation not found
  },

  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.innerText = translation;
      }
    });

    // Update flags and text in switcher if exists
    this.updateSwitcherUI();
  },

  applyDirection() {
    const dir = this.activeLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.lang = this.activeLocale;
    
    if (dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  },

  async setLanguage(locale) {
    if (this.activeLocale === locale) return;
    
    // Add a quick fade out effect
    document.body.style.opacity = '0.5';
    document.body.style.transition = 'opacity 0.2s ease';
    
    await this.loadLocale(locale);
    this.applyDirection();
    this.applyTranslations();
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  },

  updateSwitcherUI() {
    const currentLangText = document.getElementById('current-lang-text');
    const currentLangFlag = document.getElementById('current-lang-flag');
    if (!currentLangText || !currentLangFlag) return;

    if (this.activeLocale === 'ar') {
      currentLangText.innerText = 'العربية';
      currentLangFlag.innerText = '🇸🇦';
    } else {
      currentLangText.innerText = 'English';
      currentLangFlag.innerText = '🇺🇸';
    }

    // Update checkmarks
    document.querySelectorAll('[data-lang-option]').forEach(opt => {
      const check = opt.querySelector('.fa-check');
      if (opt.getAttribute('data-lang-option') === this.activeLocale) {
        check?.classList.remove('hidden');
      } else {
        check?.classList.add('hidden');
      }
    });
  },

  initSwitcher() {
    // This will be called once the switcher is injected into the DOM
    const btn = document.getElementById('lang-switcher-btn');
    const dropdown = document.getElementById('lang-dropdown');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('opacity-0');
      dropdown.classList.toggle('invisible');
      dropdown.classList.toggle('translate-y-2');
    });

    document.addEventListener('click', () => {
      dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });

    document.querySelectorAll('[data-lang-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const lang = opt.getAttribute('data-lang-option');
        this.setLanguage(lang);
      });
    });
  }
};

// Auto-initialize on load
window.addEventListener('DOMContentLoaded', () => i18n.init());
