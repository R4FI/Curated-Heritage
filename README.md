# Heritage Store - E-Commerce Platform

A modern, elegant e-commerce platform showcasing curated heritage products with a focus on Bangladeshi artisan craftsmanship. Built with React, TypeScript, and Tailwind CSS, featuring a complete authentication system with encrypted token storage.

## ✨ Features

### 🔐 Authentication System (NEW)

- ✅ Secure user registration with validation
- ✅ Login with encrypted token storage (XOR + Base64)
- ✅ Automatic token refresh on expiration
- ✅ Protected routes with authentication guards
- ✅ Social login UI (Google, Facebook) ready for OAuth
- ✅ Form validation with real-time feedback
- ✅ Toast notifications for user feedback
- ✅ Global auth state management

### 🛍️ E-Commerce Features

- Modern, responsive design with smooth animations
- Product catalog with filtering and search
- Shopping cart and checkout flow
- Product detail pages with ratings and reviews
- Category-based navigation
- User profile management
- Order history tracking
- Wishlist functionality
- Payment methods management
- Mobile-optimized interface
- SEO-friendly structure

### 🔒 Security

- Encrypted token storage (XOR cipher + Base64)
- Automatic token refresh via Axios interceptors
- Protected routes with authentication checks
- Secure password handling
- CORS protection ready
- Production-ready upgrade path to AES encryption

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun runtime
- MySQL database
- Backend API running on `http://localhost:3000`

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd heritage-store
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev
# or
bun run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/v1
VITE_ENCRYPTION_KEY=heritage-store-secret-key-2024
```

## 📚 Documentation

Comprehensive documentation is available:

- **[API Documentation](API-DOCUMENTATION.md)** - Complete API reference with 40+ endpoints
- **[Auth Setup Guide](AUTH-SETUP.md)** - Detailed authentication setup instructions
- **[Registration Implementation](REGISTRATION-IMPLEMENTATION.md)** - Registration page details
- **[Quick Start Guide](QUICK-START-AUTH.md)** - Get started with authentication quickly
- **[Auth Flow Diagrams](AUTH-FLOW-DIAGRAM.md)** - Visual authentication flow diagrams
- **[Deployment Checklist](DEPLOYMENT-CHECKLIST.md)** - Production deployment guide
- **[Implementation Summary](IMPLEMENTATION-SUMMARY.md)** - Complete feature overview

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client with interceptors
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend (Required)

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing

## 📁 Project Structure

```
heritage-store/
├── src/
│   ├── pages/
│   │   ├── Login.tsx              # 🆕 Login page
│   │   ├── Register.tsx           # 🆕 Registration page
│   │   ├── Index.tsx              # Homepage
│   │   ├── Shop.tsx               # Product listing
│   │   ├── ProductDetail.tsx      # Product details
│   │   ├── Cart.tsx               # Shopping cart
│   │   ├── Checkout.tsx           # Checkout process
│   │   ├── Profile.tsx            # User profile
│   │   ├── About.tsx              # About page
│   │   └── NotFound.tsx           # 404 page
│   ├── services/
│   │   └── authService.ts         # 🆕 API integration
│   ├── lib/
│   │   ├── secureStorage.ts       # 🆕 Encrypted storage
│   │   └── utils.ts               # Utility functions
│   ├── contexts/
│   │   └── AuthContext.tsx        # 🆕 Auth state management
│   ├── components/
│   │   ├── ProtectedRoute.tsx     # 🆕 Route guard
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Footer.tsx             # Footer component
│   │   ├── ProductCard.tsx        # Product card
│   │   ├── CategoryChip.tsx       # Category filter
│   │   ├── profile/               # Profile components
│   │   └── ui/                    # shadcn/ui components
│   ├── data/
│   │   └── products.ts            # Product data
│   ├── hooks/
│   │   └── use-toast.ts           # Toast hook
│   ├── assets/                    # Images and static files
│   └── App.tsx                    # Main app component
├── .env                           # 🆕 Environment variables
├── .env.example                   # 🆕 Environment template
├── API-DOCUMENTATION.md           # 🆕 Complete API docs
├── AUTH-SETUP.md                  # 🆕 Auth setup guide
├── REGISTRATION-IMPLEMENTATION.md # 🆕 Registration details
├── QUICK-START-AUTH.md            # 🆕 Quick start guide
├── AUTH-FLOW-DIAGRAM.md           # 🆕 Flow diagrams
├── DEPLOYMENT-CHECKLIST.md        # 🆕 Deployment guide
├── IMPLEMENTATION-SUMMARY.md      # 🆕 Feature summary
└── package.json
```

## 🔐 Authentication Flow

### Registration

1. User visits `/register`
2. Fills form (name, email, phone, password)
3. Frontend validates input
4. API call to `POST /auth/register`
5. Tokens encrypted and stored in localStorage
6. User redirected to home page

### Login

1. User visits `/login`
2. Enters email and password
3. API call to `POST /auth/login`
4. Tokens encrypted and stored
5. User redirected to home or original destination

### Protected Routes

1. User tries to access protected page (e.g., `/profile`)
2. `ProtectedRoute` component checks authentication
3. If authenticated: render page
4. If not: redirect to `/login` with return URL

### Token Refresh

1. User makes API call
2. Server returns 401 (token expired)
3. Axios interceptor catches error
4. Automatically calls `POST /auth/refresh`
5. New token stored and original request retried

## 🌐 API Endpoints

### Authentication

- `POST /v1/auth/register` - User registration
- `POST /v1/auth/login` - User login
- `POST /v1/auth/refresh` - Refresh access token
- `POST /v1/auth/logout` - User logout
- `POST /v1/auth/change-password` - Change password

### Products

- `GET /v1/products` - Get all products (with filters)
- `GET /v1/products/:id` - Get product by ID
- `GET /v1/products/categories` - Get categories
- `GET /v1/products/materials` - Get materials

### Cart

- `GET /v1/cart` - Get user cart
- `POST /v1/cart/items` - Add to cart
- `PATCH /v1/cart/items/:id` - Update cart item
- `DELETE /v1/cart/items/:id` - Remove from cart

### Orders

- `POST /v1/orders` - Create order
- `GET /v1/orders` - Get order history
- `GET /v1/orders/:id` - Get order details

### User Profile

- `GET /v1/users/profile` - Get user profile
- `PATCH /v1/users/profile` - Update profile
- `GET /v1/users/activity` - Get recent activity

See [API-DOCUMENTATION.md](API-DOCUMENTATION.md) for complete API reference.

## 🧪 Testing

### Manual Testing

```bash
# Start development server
npm run dev

# Test registration
# Navigate to: http://localhost:5173/register
# Fill form and submit

# Test login
# Navigate to: http://localhost:5173/login
# Enter credentials and submit

# Test protected routes
# Navigate to: http://localhost:5173/profile
# Should redirect to login if not authenticated
```

### Verify Token Storage

1. Open Browser DevTools (F12)
2. Go to: Application → Local Storage → `http://localhost:5173`
3. Look for keys:
   - `secure_accessToken` (encrypted)
   - `secure_refreshToken` (encrypted)
   - `secure_user` (encrypted)

### Run Tests

```bash
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

## 🔧 Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run build:dev     # Build in development mode
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run test          # Run tests once
npm run test:watch    # Run tests in watch mode
```

## 🎨 Product Categories

- Men's Fashion
- Women's Fashion
- Home & Lifestyle
- Gadgets & Electronics
- Accessories

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

### Backend Requirements

Before deploying, ensure your backend has:

- MySQL database with users table
- All authentication endpoints implemented
- JWT secret configured
- CORS enabled for your frontend domain
- HTTPS enabled in production

See [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md) for detailed deployment guide.

## 🔒 Security Best Practices

### Current Implementation

- ✅ Encrypted token storage (XOR + Base64)
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Password validation (min 8 characters)
- ✅ Form validation
- ✅ HTTPS ready

### Production Recommendations

- Upgrade to AES encryption using crypto-js
- Implement rate limiting on auth endpoints
- Add CAPTCHA on registration/login
- Enable Content Security Policy (CSP)
- Regular security audits
- Monitor for suspicious activity

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- **Heritage Store Team**

## 🙏 Acknowledgments

- Material Design color system
- Tailwind CSS for styling
- shadcn/ui for beautiful components
- React community for excellent tools
- Radix UI for accessible primitives

## 📞 Support

For issues or questions:

- Check [QUICK-START-AUTH.md](QUICK-START-AUTH.md) for quick help
- Review [API-DOCUMENTATION.md](API-DOCUMENTATION.md) for API details
- Read [AUTH-SETUP.md](AUTH-SETUP.md) for authentication setup
- Open an issue on GitHub

## 🗺️ Roadmap

### Phase 1 (Current) ✅

- ✅ Authentication system
- ✅ Product catalog
- ✅ Shopping cart
- ✅ User profile
- ✅ Checkout flow

### Phase 2 (Next) ⏳

- ⏳ Email verification
- ⏳ Password reset
- ⏳ OAuth integration (Google, Facebook)
- ⏳ Payment processing (Stripe)
- ⏳ Order tracking

### Phase 3 (Future) 🔮

- 🔮 Product reviews & ratings
- 🔮 Admin dashboard
- 🔮 Analytics & reporting
- 🔮 Multi-language support
- 🔮 Mobile app (React Native)

---

**Status:** ✅ Frontend Complete | ⏳ Backend Required  
**Version:** 1.0.0  
**Last Updated:** 2024  
**Next Steps:** Implement backend API and deploy
