# 
```
███████╗██╗  ██╗ ██████╗ ██████╗ ██╗     ██╗   ██╗██╗  ██╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗██║     ██║   ██║╚██╗██╔╝
███████╗███████║██║   ██║██████╔╝██║     ██║   ██║ ╚███╔╝ 
╚════██║██╔══██║██║   ██║██╔═══╝ ██║     ██║   ██║ ██╔██╗ 
███████║██║  ██║╚██████╔╝██║     ███████╗╚██████╔╝██╔╝ ██╗
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
```

<div align="center">

### ✦ *Premium E-Commerce Experience* ✦

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ShopLux-6366f1?style=for-the-badge&labelColor=0a0a0a)](https://ecommerce-frontend-gules-chi.vercel.app)
[![API](https://img.shields.io/badge/⚡_REST_API-Live-22c55e?style=for-the-badge&labelColor=0a0a0a)](https://ecommerce-api-psi-three.vercel.app/api/products)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=0a0a0a)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=0a0a0a)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0a0a0a)](https://vercel.com)

</div>

---

## ⚡ Vibe Coding Project

> *Built with pure focus, one feature at a time — no templates, no shortcuts, just raw code and good vibes.*

ShopLux is a **full-stack e-commerce platform** built entirely through **vibe coding** — a flow-state development approach where every line of code is intentional, every feature is carefully crafted, and the result speaks for itself.

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🛍️ **Frontend** | [ecommerce-frontend-gules-chi.vercel.app](https://ecommerce-frontend-gules-chi.vercel.app) |
| ⚡ **Backend API** | [ecommerce-api-psi-three.vercel.app](https://ecommerce-api-psi-three.vercel.app/api/products) |

---

## 🗂️ Project Structure

```
ShopLux/
├── 🔧 ecommerce-api/          ← Node.js Backend
│   ├── app.js
│   ├── vercel.json
│   └── src/
│       ├── models/            ← MongoDB Schemas
│       ├── controllers/       ← Business Logic
│       ├── routes/            ← API Endpoints
│       ├── middlewares/       ← Auth, Error, Upload
│       ├── utils/             ← Helpers & Features
│       ├── validations/       ← Joi Schemas
│       └── config/            ← Passport (Google OAuth)
│
└── 🎨 ecommerce-frontend/     ← Vanilla HTML/CSS/JS
    ├── index.html             ← Home
    ├── products.html          ← Product Listing
    ├── product.html           ← Product Details
    ├── cart.html              ← Shopping Cart
    ├── checkout.html          ← Checkout
    ├── login.html             ← Login + Google OAuth
    ├── register.html          ← Register
    ├── profile.html           ← User Profile
    ├── wishlist.html          ← Wishlist
    ├── admin/                 ← Admin Dashboard
    │   ├── index.html
    │   ├── products.html
    │   ├── orders.html
    │   └── categories.html
    ├── js/
    │   ├── api.js             ← Axios Instance + JWT
    │   ├── auth.js            ← Auth Functions
    │   ├── cart.js            ← Cart Operations
    │   ├── products.js        ← Product Functions
    │   └── admin.js           ← Admin Functions
    └── css/
        └── custom.css         ← Glassmorphism + Effects
```

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express** | Server & REST API |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication |
| **Bcrypt.js** | Password Hashing |
| **Nodemailer** | Email (Forgot Password) |
| **Multer + Cloudinary** | Image Upload |
| **Passport.js** | Google OAuth 2.0 |
| **Joi** | Request Validation |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **HTML5 + Tailwind CSS** | Structure & Styling |
| **Vanilla JavaScript** | Interactivity |
| **Axios** | API Calls |
| **SwiperJS** | Product Sliders |
| **AOS** | Scroll Animations |
| **Font Awesome** | Icons |

### DevOps
| Technology | Purpose |
|-----------|---------|
| **Vercel** | Deployment (Frontend + Backend) |
| **MongoDB Atlas** | Cloud Database |
| **Cloudinary** | Image CDN |
| **GitHub** | Version Control |

---

## ✅ Features

### 🔐 Authentication
- [x] Register & Login with JWT
- [x] Google OAuth 2.0 (Sign in with Google)
- [x] Forgot & Reset Password (via Email)
- [x] Update Profile & Password
- [x] Role-based access (User / Admin)

### 🛍️ Products
- [x] Product listing with pagination
- [x] Filter by category, price range, stock
- [x] Search with autocomplete
- [x] Sort (newest, price, name)
- [x] Product details page
- [x] Related products
- [x] Image upload via Cloudinary

### ⭐ Reviews & Wishlist
- [x] Product reviews & star ratings
- [x] Add / Remove from wishlist
- [x] Wishlist page

### 🛒 Cart & Orders
- [x] Add / Remove / Update cart items
- [x] Place orders with shipping address
- [x] Order history & tracking
- [x] Order status timeline (pending → delivered)

### 🎛️ Admin Dashboard
- [x] Product CRUD with image upload
- [x] Category management
- [x] Order management & status updates
- [x] Stats overview

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me              🔒
PUT    /api/auth/update-profile  🔒
PUT    /api/auth/update-password 🔒
POST   /api/auth/forgot-password
PUT    /api/auth/reset-password/:token
GET    /api/auth/google
GET    /api/auth/google/callback
```

### Products
```
GET    /api/products             ?search= &category= &sort= &page= &limit= &price[lte]=
GET    /api/products/:id
POST   /api/products             🔒 👑
PUT    /api/products/:id         🔒 👑
DELETE /api/products/:id         🔒 👑
```

### Cart
```
GET    /api/cart                 🔒
POST   /api/cart                 🔒
DELETE /api/cart/:productId      🔒
```

### Orders
```
POST   /api/orders               🔒
GET    /api/orders/my            🔒
GET    /api/orders               🔒 👑
PUT    /api/orders/:id/status    🔒 👑
```

### Reviews
```
GET    /api/reviews/:productId
POST   /api/reviews/:productId   🔒
DELETE /api/reviews/:id          🔒
```

### Wishlist
```
GET    /api/wishlist             🔒
POST   /api/wishlist/:productId  🔒
DELETE /api/wishlist/:productId  🔒
```

> 🔒 = Requires Auth &nbsp;&nbsp; 👑 = Admin Only

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/Mohamed-ElTahawy05/ecommerce-api.git
cd ecommerce-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5500
```

### 4. Seed the database
```bash
node src/seed.js
```

### 5. Start the server
```bash
npm run dev
```

### 6. Open the frontend
Open `ecommerce-frontend/index.html` with **Live Server** in VS Code.

---

## 🎨 Design System

```
Background  →  #0a0a0a  (Deep Black)
Accent      →  #6366f1  (Indigo)
Text        →  #ffffff  (White)
Cards       →  Glassmorphism + subtle borders
Animations  →  AOS scroll + CSS transitions
Font        →  Inter (Google Fonts)
```

---

## 📂 Database Models

```
User        → name, email, password, role, resetToken
Product     → name, description, price, image, category, stock, avgRating
Category    → name, slug
Cart        → user, items[{product, quantity}]
Order       → user, items, totalPrice, status, shippingAddress
Review      → user, product, rating, comment
Wishlist    → user, products[]
```

---

## 🧠 Vibe Coding Philosophy

> *"Don't overthink it. Feel the code. Ship it."*

This project was built with the **vibe coding** mindset:

- 🎯 **Focus over perfection** — ship features that work
- 🔁 **Iterate fast** — fix bugs as they come
- 🧩 **One feature at a time** — no premature optimization
- 💡 **Learn by doing** — every error is a lesson
- 🚀 **Deploy early** — real feedback beats assumptions

---

## 👨‍💻 Developer

**Mohamed El-Tahawy**  
Computer Science Student @ Zagazig University  
Backend Developer in the making 🚀

[![GitHub](https://img.shields.io/badge/GitHub-Mohamed--ElTahawy05-181717?style=for-the-badge&logo=github&labelColor=0a0a0a)](https://github.com/Mohamed-ElTahawy05)

---

<div align="center">

*Built with ❤️ and good vibes*

**ShopLux** — *Where premium meets code*

</div>
