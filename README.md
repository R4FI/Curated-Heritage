# Heritage Lifestyle Dropshipping Store

A modern, elegant e-commerce platform showcasing curated heritage products with a focus on Bangladeshi artisan craftsmanship. Built with React, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design with smooth animations
- Product catalog with filtering and search
- Shopping cart and checkout flow
- Product detail pages with ratings and reviews
- Category-based navigation
- Mobile-optimized interface
- SEO-friendly structure

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** Radix UI primitives with shadcn/ui
- **Routing:** React Router v6
- **State Management:** TanStack Query
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Fonts:** Inter & Manrope

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vite_react_shadcn_ts
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   └── ui/         # shadcn/ui components
├── data/           # Product data and mock content
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Route pages
│   ├── Index.tsx   # Homepage
│   ├── Shop.tsx    # Product listing
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── About.tsx
└── test/           # Test files
```

## Product Categories

- Men's Fashion
- Women's Fashion
- Home & Lifestyle
- Gadgets & Electronics
- Accessories

## Key Features

### Homepage

- Hero banner with call-to-action
- Category showcase grid
- New arrivals carousel
- Editor's choice section

### Shop Page

- Product grid with filtering
- Category and material filters
- Search functionality
- Responsive layout

### Product Details

- High-quality product images
- Detailed descriptions
- Customer ratings and reviews
- Add to cart functionality

### Cart & Checkout

- Shopping cart management
- Order summary
- Checkout form with validation

## Customization

### Design Tokens

The project uses a custom design system defined in `tailwind.config.ts` with:

- Custom color palette
- Typography scale
- Spacing system
- Animation utilities

### Adding Products

Edit `src/data/products.ts` to add or modify products:

```typescript
{
  id: "unique-id",
  name: "Product Name",
  price: 4500,
  category: "Category",
  image: productImage,
  description: "Product description",
  rating: 4.7,
  reviews: 89,
  material: "Material Type"
}
```

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, contact the development team.
