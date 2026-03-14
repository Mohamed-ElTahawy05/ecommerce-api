const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categories = [
    { name: 'Clothing', slug: 'clothes' },
    { name: 'Shoes', slug: 'shoes' },
    { name: 'Perfumes', slug: 'perfumes' },
    { name: 'Watches', slug: 'watches' },
    { name: 'Books', slug: 'books' },
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Computers & Laptops', slug: 'computers' },
    { name: 'Mobile Phones', slug: 'mobiles' },
    { name: 'Home & Kitchen', slug: 'home-kitchen' },
    { name: 'Sports & Outdoors', slug: 'sports' },
    { name: 'Beauty & Personal Care', slug: 'beauty' },
    { name: 'Toys & Games', slug: 'toys' },
    { name: 'Furniture', slug: 'furniture' },
    { name: 'Grocery & Food', slug: 'grocery' },
    { name: 'Automotive', slug: 'automotive' },
];

const products = (cats) => [
    // Clothing
    { name: 'T-Shirt Classic White', description: 'Premium cotton classic white t-shirt, comfortable and stylish for everyday wear.', price: 29, stock: 100, category: cats['clothes'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
    { name: 'Black Hoodie', description: 'Warm and cozy black hoodie perfect for cold weather and casual outings.', price: 59, stock: 80, category: cats['clothes'], image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800' },
    { name: 'Slim Fit Jeans', description: 'Modern slim fit jeans with stretch fabric for maximum comfort.', price: 79, stock: 60, category: cats['clothes'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800' },
    { name: 'Formal Shirt', description: 'Elegant formal shirt for business meetings and special occasions.', price: 49, stock: 70, category: cats['clothes'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800' },
    { name: 'Summer Dress', description: 'Light and breezy summer dress with floral pattern, perfect for warm days.', price: 69, stock: 50, category: cats['clothes'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800' },

    // Shoes
    { name: 'Nike Air Max', description: 'Iconic Nike Air Max sneakers with superior cushioning and modern design.', price: 129, stock: 45, category: cats['shoes'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
    { name: 'Leather Boots', description: 'Genuine leather boots with durable sole, perfect for all seasons.', price: 159, stock: 30, category: cats['shoes'], image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800' },
    { name: 'Casual Loafers', description: 'Comfortable slip-on loafers for casual everyday use.', price: 89, stock: 55, category: cats['shoes'], image: 'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800' },
    { name: 'Running Shoes', description: 'Lightweight running shoes with advanced grip technology for athletes.', price: 109, stock: 40, category: cats['shoes'], image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800' },
    { name: 'Sandals', description: 'Comfortable summer sandals with adjustable straps and soft footbed.', price: 49, stock: 75, category: cats['shoes'], image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800' },

    // Perfumes
    { name: 'Chanel No. 5', description: 'The iconic Chanel No. 5 perfume, a timeless classic for women.', price: 199, stock: 25, category: cats['perfumes'], image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800' },
    { name: 'Dior Sauvage', description: 'Dior Sauvage - a fresh and bold masculine fragrance for modern men.', price: 179, stock: 30, category: cats['perfumes'], image: 'https://images.unsplash.com/photo-1592945403407-9caf930b6a95?w=800' },
    { name: 'Oud Royal', description: 'Rich and luxurious oud fragrance with oriental notes, long lasting.', price: 249, stock: 20, category: cats['perfumes'], image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800' },
    { name: 'Rose Garden', description: 'Delicate rose fragrance perfect for everyday wear and special occasions.', price: 129, stock: 35, category: cats['perfumes'], image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800' },
    { name: 'Ocean Blue', description: 'Fresh aquatic fragrance inspired by the ocean breeze and sea salt.', price: 99, stock: 40, category: cats['perfumes'], image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800' },

    // Watches
    { name: 'Rolex Submariner', description: 'Iconic Rolex Submariner diving watch with stainless steel bracelet.', price: 999, stock: 10, category: cats['watches'], image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800' },
    { name: 'Casio G-Shock', description: 'Tough and durable Casio G-Shock with shock resistance and water resistance.', price: 149, stock: 50, category: cats['watches'], image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800' },
    { name: 'Apple Watch Series 9', description: 'Latest Apple Watch with health monitoring, GPS and cellular connectivity.', price: 499, stock: 30, category: cats['watches'], image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800' },
    { name: 'Classic Leather Watch', description: 'Elegant classic watch with genuine leather strap and minimalist design.', price: 199, stock: 35, category: cats['watches'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800' },
    { name: 'Smart Watch Pro', description: 'Feature-rich smart watch with fitness tracking and notification support.', price: 299, stock: 25, category: cats['watches'], image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800' },

    // Books
    { name: 'Atomic Habits', description: 'James Clear\'s bestselling book on building good habits and breaking bad ones.', price: 19, stock: 200, category: cats['books'], image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800' },
    { name: 'The Alchemist', description: 'Paulo Coelho\'s magical novel about following your dreams and destiny.', price: 15, stock: 150, category: cats['books'], image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800' },
    { name: 'Rich Dad Poor Dad', description: 'Robert Kiyosaki\'s classic book on financial education and building wealth.', price: 17, stock: 180, category: cats['books'], image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800' },
    { name: 'Clean Code', description: 'Robert Martin\'s essential guide to writing clean, maintainable code.', price: 45, stock: 90, category: cats['books'], image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800' },
    { name: 'The Psychology of Money', description: 'Morgan Housel\'s timeless lessons on wealth, greed, and happiness.', price: 21, stock: 160, category: cats['books'], image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800' },

    // Electronics
    { name: 'Sony 4K TV 55"', description: 'Sony 55 inch 4K Ultra HD Smart TV with HDR and Dolby Vision.', price: 799, stock: 20, category: cats['electronics'], image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=800' },
    { name: 'Sony WH-1000XM5', description: 'Industry-leading noise canceling wireless headphones with 30hr battery.', price: 349, stock: 40, category: cats['electronics'], image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' },
    { name: 'Canon EOS R50', description: 'Compact mirrorless camera with 24.2MP sensor and 4K video recording.', price: 899, stock: 15, category: cats['electronics'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800' },
    { name: 'iPad Air 5th Gen', description: 'Apple iPad Air with M1 chip, 10.9 inch Liquid Retina display.', price: 599, stock: 25, category: cats['electronics'], image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
    { name: 'PlayStation 5', description: 'Sony PlayStation 5 console with DualSense controller and 825GB SSD.', price: 499, stock: 10, category: cats['electronics'], image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800' },

    // Computers & Laptops
    { name: 'MacBook Pro 14"', description: 'Apple MacBook Pro with M3 Pro chip, 18GB RAM and 512GB SSD.', price: 1999, stock: 15, category: cats['computers'], image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
    { name: 'Dell XPS 15', description: 'Dell XPS 15 with Intel Core i7, 16GB RAM and OLED display.', price: 1499, stock: 20, category: cats['computers'], image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800' },
    { name: 'Gaming PC RTX 4080', description: 'High-performance gaming desktop with RTX 4080, 32GB RAM and 1TB SSD.', price: 2499, stock: 8, category: cats['computers'], image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800' },
    { name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard with Cherry MX switches.', price: 149, stock: 60, category: cats['computers'], image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800' },
    { name: 'Logitech MX Master 3', description: 'Advanced wireless mouse with ergonomic design and precision scrolling.', price: 99, stock: 75, category: cats['computers'], image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' },

    // Mobile Phones
    { name: 'iPhone 15 Pro Max', description: 'Apple iPhone 15 Pro Max with A17 Pro chip, titanium design and 48MP camera.', price: 1199, stock: 30, category: cats['mobiles'], image: 'https://images.unsplash.com/photo-1696446702183-cbd96f7d0f33?w=800' },
    { name: 'Samsung Galaxy S24 Ultra', description: 'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3 and S Pen.', price: 1299, stock: 25, category: cats['mobiles'], image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800' },
    { name: 'Google Pixel 8 Pro', description: 'Google Pixel 8 Pro with Tensor G3 chip and advanced AI features.', price: 999, stock: 20, category: cats['mobiles'], image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800' },
    { name: 'OnePlus 12', description: 'OnePlus 12 with Snapdragon 8 Gen 3, 50MP Hasselblad camera.', price: 799, stock: 35, category: cats['mobiles'], image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800' },
    { name: 'Phone Case Premium', description: 'Premium leather phone case with card holder and magnetic closure.', price: 39, stock: 150, category: cats['mobiles'], image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800' },

    // Home & Kitchen
    { name: 'Nespresso Coffee Machine', description: 'Nespresso Vertuo Plus coffee machine with 5 cup sizes.', price: 179, stock: 30, category: cats['home-kitchen'], image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800' },
    { name: 'KitchenAid Stand Mixer', description: 'Professional 5Qt stand mixer with 10 speeds and tilt-head design.', price: 399, stock: 20, category: cats['home-kitchen'], image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800' },
    { name: 'Instant Pot Duo 7-in-1', description: 'Multi-use pressure cooker, slow cooker, rice cooker and steamer.', price: 99, stock: 45, category: cats['home-kitchen'], image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' },
    { name: 'Dyson V15 Vacuum', description: 'Dyson V15 cordless vacuum with laser dust detection technology.', price: 699, stock: 15, category: cats['home-kitchen'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
    { name: 'Air Purifier HEPA', description: 'True HEPA air purifier covering 500 sq ft, removes 99.97% of particles.', price: 249, stock: 25, category: cats['home-kitchen'], image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800' },

    // Sports & Outdoors
    { name: 'Yoga Mat Premium', description: 'Extra thick non-slip yoga mat with alignment lines and carry strap.', price: 69, stock: 80, category: cats['sports'], image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800' },
    { name: 'Adjustable Dumbbells', description: 'Space-saving adjustable dumbbells from 5 to 52.5 lbs per dumbbell.', price: 299, stock: 20, category: cats['sports'], image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800' },
    { name: 'Cycling Helmet', description: 'Lightweight aerodynamic cycling helmet with MIPS technology.', price: 89, stock: 40, category: cats['sports'], image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800' },
    { name: 'Camping Tent 4-Person', description: 'Waterproof 4-person camping tent with easy setup and carry bag.', price: 149, stock: 30, category: cats['sports'], image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800' },
    { name: 'Protein Powder Whey', description: 'Premium whey protein powder, 25g protein per serving, chocolate flavor.', price: 59, stock: 100, category: cats['sports'], image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800' },

    // Beauty & Personal Care
    { name: 'Ordinary Serum Set', description: 'Complete skincare routine set with Vitamin C, Niacinamide and Hyaluronic Acid.', price: 49, stock: 60, category: cats['beauty'], image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800' },
    { name: 'Dyson Airwrap', description: 'Dyson Airwrap multi-styler for curling, waving and drying hair.', price: 599, stock: 15, category: cats['beauty'], image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800' },
    { name: 'Electric Face Cleanser', description: 'Sonic facial cleansing brush with 3 speed settings and waterproof design.', price: 79, stock: 45, category: cats['beauty'], image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800' },
    { name: 'Sunscreen SPF 50+', description: 'Lightweight broad spectrum sunscreen SPF 50+ for daily protection.', price: 29, stock: 120, category: cats['beauty'], image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800' },
    { name: 'Makeup Brush Set', description: 'Professional 15-piece makeup brush set with synthetic bristles.', price: 39, stock: 80, category: cats['beauty'], image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800' },

    // Toys & Games
    { name: 'LEGO Technic Set', description: 'Advanced LEGO Technic set with 1500+ pieces and working mechanisms.', price: 129, stock: 35, category: cats['toys'], image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800' },
    { name: 'Remote Control Car', description: 'High-speed RC car with 4WD, waterproof body and 30mph top speed.', price: 79, stock: 50, category: cats['toys'], image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800' },
    { name: 'Board Game Catan', description: 'The classic Catan strategy board game for 3-4 players.', price: 45, stock: 60, category: cats['toys'], image: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?w=800' },
    { name: 'Barbie Dreamhouse', description: 'Barbie Dreamhouse with 3 stories, 8 rooms and 70+ accessories.', price: 199, stock: 20, category: cats['toys'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
    { name: 'Puzzle 1000 Pieces', description: 'Beautiful landscape puzzle with 1000 pieces, perfect for all ages.', price: 25, stock: 90, category: cats['toys'], image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800' },

    // Furniture
    { name: 'Ergonomic Office Chair', description: 'Premium ergonomic office chair with lumbar support and adjustable armrests.', price: 399, stock: 20, category: cats['furniture'], image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800' },
    { name: 'Standing Desk', description: 'Electric height-adjustable standing desk with memory settings.', price: 599, stock: 15, category: cats['furniture'], image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800' },
    { name: 'Bookshelf Modern', description: 'Modern 5-tier bookshelf with industrial design and sturdy metal frame.', price: 149, stock: 30, category: cats['furniture'], image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
    { name: 'Sofa 3-Seater', description: 'Comfortable 3-seater sofa with premium fabric and solid wood legs.', price: 799, stock: 10, category: cats['furniture'], image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
    { name: 'Bed Frame King Size', description: 'Modern king size bed frame with upholstered headboard and storage.', price: 699, stock: 12, category: cats['furniture'], image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800' },

    // Grocery & Food
    { name: 'Organic Green Tea', description: 'Premium organic Japanese green tea, 100 bags, antioxidant rich.', price: 19, stock: 200, category: cats['grocery'], image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800' },
    { name: 'Extra Virgin Olive Oil', description: 'Cold-pressed extra virgin olive oil from Mediterranean olives, 1L.', price: 25, stock: 150, category: cats['grocery'], image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800' },
    { name: 'Manuka Honey 500g', description: 'Premium New Zealand Manuka honey MGO 400+, antibacterial properties.', price: 49, stock: 80, category: cats['grocery'], image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800' },
    { name: 'Protein Granola', description: 'High protein granola with nuts, seeds and dried fruits, no added sugar.', price: 15, stock: 180, category: cats['grocery'], image: 'https://images.unsplash.com/photo-1517093602195-b40af9bb4c6e?w=800' },
    { name: 'Dark Chocolate 85%', description: 'Premium dark chocolate 85% cocoa, rich in antioxidants, pack of 12.', price: 29, stock: 120, category: cats['grocery'], image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=800' },

    // Automotive
    { name: 'Car Dash Cam 4K', description: '4K dash camera with night vision, GPS and parking mode.', price: 149, stock: 40, category: cats['automotive'], image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800' },
    { name: 'Wireless Car Charger', description: '15W wireless fast charger with automatic clamping and air vent mount.', price: 49, stock: 80, category: cats['automotive'], image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800' },
    { name: 'Car Vacuum Cleaner', description: 'Portable cordless car vacuum with strong suction and HEPA filter.', price: 79, stock: 55, category: cats['automotive'], image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800' },
    { name: 'Tire Inflator Portable', description: 'Portable digital tire inflator with auto-shutoff and LED display.', price: 59, stock: 65, category: cats['automotive'], image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800' },
    { name: 'Car Seat Organizer', description: 'Multi-pocket car seat back organizer with tablet holder and cup holders.', price: 35, stock: 90, category: cats['automotive'], image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800' },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Old data cleared 🗑️');

    const createdCategories = await Category.insertMany(categories);
    const cats = {};
    createdCategories.forEach(c => cats[c.slug] = c._id);
    console.log('Categories added ✅');

    await Product.insertMany(products(cats));
    console.log('Products added ✅');

    console.log('Seed completed 🎉');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});