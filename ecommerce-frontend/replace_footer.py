import os
import glob
import re

new_footer = """  <!-- ─── FOOTER ────────────────────────────────── -->
  <footer class="border-t border-white/10 pt-16 pb-8 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
        <div class="lg:col-span-2">
          <a href="index.html" class="flex items-center gap-2.5 mb-6">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <i class="fa-solid fa-bolt text-white"></i>
            </div>
            <span class="text-xl font-bold tracking-tight">Shop<span class="text-indigo-400">Lux</span></span>
          </a>
          <p class="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
            Elevating your shopping experience with premium curated collections. Shop the future of style with seamless browsing and secure checkout.
          </p>
          <div class="flex items-center gap-3">
            <a href="#" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all group" title="Facebook">
              <i class="fa-brands fa-facebook-f group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all group" title="Twitter">
              <i class="fa-brands fa-twitter group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all group" title="Instagram">
              <i class="fa-brands fa-instagram text-lg group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-indigo-400 transition-all group" title="TikTok">
              <i class="fa-brands fa-tiktok group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>
        
        <div>
          <h5 class="font-bold text-base text-white mb-6">Shop</h5>
          <ul class="space-y-4 text-sm text-white/50">
            <li><a href="products.html?category=men" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Men</a></li>
            <li><a href="products.html?category=women" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Women</a></li>
            <li><a href="products.html?category=accessories" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Accessories</a></li>
            <li><a href="products.html?discount=true" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Sale</a></li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-bold text-base text-white mb-6">Support</h5>
          <ul class="space-y-4 text-sm text-white/50">
            <li><a href="faq.html" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> FAQ</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Returns</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Shipping</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-bold text-base text-white mb-6">Company</h5>
          <ul class="space-y-4 text-sm text-white/50">
            <li><a href="about.html" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> About Us</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Careers</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Privacy Policy</a></li>
            <li><a href="#" class="hover:text-indigo-400 transition-colors flex items-center gap-2"><i class="fa-solid fa-angle-right text-[10px] text-white/20"></i> Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-white/40 text-sm">© 2024 ShopLux. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <div class="h-8 px-3 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" title="Visa">
            <i class="fa-brands fa-cc-visa text-xl"></i>
          </div>
          <div class="h-8 px-3 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" title="Mastercard">
            <i class="fa-brands fa-cc-mastercard text-xl"></i>
          </div>
          <div class="h-8 px-3 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" title="PayPal">
            <i class="fa-brands fa-cc-paypal text-xl"></i>
          </div>
          <div class="h-8 px-3 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" title="Apple Pay">
            <i class="fa-brands fa-cc-apple-pay text-xl"></i>
          </div>
          <div class="h-8 px-3 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors" title="Google Pay">
            <i class="fa-brands fa-google-pay text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>"""

def parse_html_files():
    html_files = glob.glob('c:/Users/MAS/ecommerce-api/ecommerce-frontend/*.html')
    
    footer_pattern = re.compile(r'<!-- ─── FOOTER ────────────────────────────────── -->\s*<footer.*?>.*?</footer>', re.DOTALL)
    simple_footer_pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL)
    
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if re.search(footer_pattern, content):
            new_content = re.sub(footer_pattern, new_footer, content)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file} (regex replacement)")
        elif re.search(simple_footer_pattern, content):
            new_content = re.sub(simple_footer_pattern, new_footer, content)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file} (simple regex replacement)")
        else:
            # No footer found, try to insert before the last </main> or first <script> or before </body>
            if '</main>' in content:
                new_content = content.replace('</main>', '</main>\n\n' + new_footer)
            elif '<script' in content:
                new_content = content.replace('<script', '\n' + new_footer + '\n\n<script', 1)
            else:
                new_content = content.replace('</body>', '\n' + new_footer + '\n</body>')
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file} (inserted footer)")

if __name__ == "__main__":
    parse_html_files()
