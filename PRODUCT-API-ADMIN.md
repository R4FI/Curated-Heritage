# 🎨 Frontend Products API Reference

Complete API documentation for implementing the admin products interface in your frontend application.

---

## 🔐 Authentication

All endpoints require admin authentication. Include the JWT token in the Authorization header:

```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
}
```

**Base URL:** `http://localhost:3000` (or your API URL)

---

## 📋 API Endpoints Overview

| Method | Endpoint                        | Purpose                        |
| ------ | ------------------------------- | ------------------------------ |
| GET    | `/admin/products`               | Get products list with filters |
| GET    | `/admin/products/:id`           | Get single product details     |
| POST   | `/admin/products`               | Create new product             |
| PATCH  | `/admin/products/:id`           | Update product                 |
| DELETE | `/admin/products/:id`           | Delete product                 |
| PATCH  | `/admin/products/bulk/update`   | Bulk update products           |
| GET    | `/admin/products/:id/analytics` | Get product analytics          |

---

## 1️⃣ Get Products List

**Endpoint:** `GET /admin/products`

### Query Parameters

```typescript
interface ProductQueryParams {
  category?: string; // Filter by category
  status?: "active" | "inactive" | "draft"; // Filter by status
  inStock?: boolean; // Filter by stock availability
  search?: string; // Search in name, SKU, description
  page?: number; // Page number (default: 1)
  limit?: number; // Items per page (default: 20)
  sortBy?: "name" | "price" | "stock" | "createdAt" | "totalSales";
  sortOrder?: "asc" | "desc"; // Sort direction (default: desc)
}
```

### Request Examples

```javascript
// Basic list
fetch("http://localhost:3000/admin/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// With filters
const params = new URLSearchParams({
  category: "Men's Fashion",
  status: "active",
  page: "1",
  limit: "20",
  sortBy: "totalSales",
  sortOrder: "desc",
});

fetch(`http://localhost:3000/admin/products?${params}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// With search
fetch("http://localhost:3000/admin/products?search=linen&status=active", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Response

```typescript
interface ProductListResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

interface Product {
  id: string; // UUID
  name: string;
  sku: string;
  description: string;
  price: number; // In smallest currency unit
  costPrice: number;
  originalPrice: number | null;
  category: string;
  material: string | null;
  stock: number;
  lowStockThreshold: number;
  images: string[]; // Array of image URLs
  variants: {
    colors?: string[];
    sizes?: string[];
  } | null;
  badge: string | null; // e.g., "New Arrival", "Sale"
  status: "active" | "inactive" | "draft";
  rating: number; // 0-5
  reviewCount: number;
  totalSales: number;
  totalRevenue: number;
  viewCount: number;
  supplier: {
    id: string;
    name: string;
    // ... other supplier fields
  } | null;
  createdAt: string; // ISO 8601 date
  updatedAt: string; // ISO 8601 date
  profitMargin: string; // Calculated percentage
  inStock: boolean; // Calculated
  isLowStock: boolean; // Calculated
}
```

### Response Example

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Heritage Linen Over-shirt",
        "sku": "HB-LS-001",
        "description": "Premium linen over-shirt with traditional craftsmanship",
        "price": 4500,
        "costPrice": 2800,
        "originalPrice": 5000,
        "category": "Men's Fashion",
        "material": "100% Linen",
        "stock": 45,
        "lowStockThreshold": 10,
        "images": [
          "/images/product-overshirt-1.jpg",
          "/images/product-overshirt-2.jpg"
        ],
        "variants": {
          "colors": ["Olive Green", "Navy Blue"],
          "sizes": ["M", "L", "XL"]
        },
        "badge": "New Arrival",
        "status": "active",
        "rating": 4.7,
        "reviewCount": 89,
        "totalSales": 234,
        "totalRevenue": 1053000,
        "viewCount": 5678,
        "supplier": null,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-03-20T14:22:00Z",
        "profitMargin": "37.78",
        "inStock": true,
        "isLowStock": false
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 156,
      "itemsPerPage": 20
    }
  }
}
```

---

## 2️⃣ Get Single Product

**Endpoint:** `GET /admin/products/:id`

### Request

```javascript
fetch(`http://localhost:3000/admin/products/${productId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Response

```typescript
interface SingleProductResponse {
  success: boolean;
  data: Product; // Same Product interface as above
}
```

### Response Example

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Heritage Linen Over-shirt",
    "sku": "HB-LS-001",
    "description": "Premium linen over-shirt with traditional craftsmanship",
    "price": 4500,
    "costPrice": 2800,
    "originalPrice": 5000,
    "category": "Men's Fashion",
    "material": "100% Linen",
    "stock": 45,
    "lowStockThreshold": 10,
    "images": [
      "/images/product-overshirt-1.jpg",
      "/images/product-overshirt-2.jpg"
    ],
    "variants": {
      "colors": ["Olive Green", "Navy Blue"],
      "sizes": ["M", "L", "XL"]
    },
    "badge": "New Arrival",
    "status": "active",
    "rating": 4.7,
    "reviewCount": 89,
    "totalSales": 234,
    "totalRevenue": 1053000,
    "viewCount": 5678,
    "supplier": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-03-20T14:22:00Z"
  }
}
```

---

## 3️⃣ Create Product

**Endpoint:** `POST /admin/products`

### Request Body

```typescript
interface CreateProductRequest {
  name: string; // Required, max 255 chars
  sku: string; // Required, unique, max 100 chars
  description: string; // Required
  price: number; // Required, min 0
  cost: number; // Required, min 0
  originalPrice?: number; // Optional, min 0
  category?: string; // Optional, max 255 chars
  material?: string; // Optional, max 255 chars
  stock?: number; // Optional, default 0, min 0
  lowStockThreshold?: number; // Optional, default 10, min 1
  images?: string[]; // Optional, array of URLs
  variants?: {
    // Optional
    colors?: string[];
    sizes?: string[];
  };
  badge?: string; // Optional, max 100 chars
  status?: "active" | "inactive" | "draft"; // Optional, default 'active'
}
```

### Request Example

```javascript
const productData = {
  name: "Heritage Linen Over-shirt",
  sku: "HB-LS-001",
  description: "Premium linen over-shirt with traditional craftsmanship",
  price: 4500,
  cost: 2800,
  originalPrice: 5000,
  category: "Men's Fashion",
  material: "100% Linen",
  stock: 45,
  lowStockThreshold: 10,
  images: [
    "/images/product-overshirt-1.jpg",
    "/images/product-overshirt-2.jpg",
  ],
  variants: {
    colors: ["Olive Green", "Navy Blue"],
    sizes: ["M", "L", "XL"],
  },
  badge: "New Arrival",
  status: "active",
};

fetch("http://localhost:3000/admin/products", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(productData),
});
```

### Response

```typescript
interface CreateProductResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    sku: string;
    status: string;
    createdAt: string;
  };
}
```

### Response Example

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Heritage Linen Over-shirt",
    "sku": "HB-LS-001",
    "status": "active",
    "createdAt": "2024-03-25T10:00:00Z"
  }
}
```

---

## 4️⃣ Update Product

**Endpoint:** `PATCH /admin/products/:id`

### Request Body

```typescript
interface UpdateProductRequest {
  // All fields are optional - only send what you want to update
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  cost?: number;
  originalPrice?: number;
  category?: string;
  material?: string;
  stock?: number;
  lowStockThreshold?: number;
  images?: string[];
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  badge?: string;
  status?: "active" | "inactive" | "draft";
}
```

### Request Example

```javascript
// Update only price and stock
const updates = {
  price: 4200,
  stock: 50,
};

fetch(`http://localhost:3000/admin/products/${productId}`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updates),
});
```

### Response

```typescript
interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    updatedFields: string[];
    updatedAt: string;
  };
}
```

### Response Example

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "updatedFields": ["price", "stock"],
    "updatedAt": "2024-03-25T11:30:00Z"
  }
}
```

---

## 5️⃣ Delete Product

**Endpoint:** `DELETE /admin/products/:id`

### Request

```javascript
fetch(`http://localhost:3000/admin/products/${productId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Response

```typescript
interface DeleteProductResponse {
  success: boolean;
  message: string;
}
```

### Response Example

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 6️⃣ Bulk Update Products

**Endpoint:** `PATCH /admin/products/bulk/update`

### Request Body

```typescript
interface BulkUpdateRequest {
  productIds: string[]; // Array of product UUIDs (max 100)
  updates: {
    status?: "active" | "inactive" | "draft";
    category?: string;
    badge?: string;
  };
}
```

### Request Example

```javascript
const bulkUpdate = {
  productIds: [
    "550e8400-e29b-41d4-a716-446655440000",
    "660e8400-e29b-41d4-a716-446655440001",
    "770e8400-e29b-41d4-a716-446655440002",
  ],
  updates: {
    status: "active",
    category: "Men's Fashion",
  },
};

fetch("http://localhost:3000/admin/products/bulk/update", {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bulkUpdate),
});
```

### Response

```typescript
interface BulkUpdateResponse {
  success: boolean;
  message: string;
  data: {
    updatedCount: number;
    failedIds: string[];
  };
}
```

### Response Example

```json
{
  "success": true,
  "message": "3 products updated successfully",
  "data": {
    "updatedCount": 3,
    "failedIds": []
  }
}
```

---

## 7️⃣ Get Product Analytics

**Endpoint:** `GET /admin/products/:id/analytics`

### Request

```javascript
fetch(`http://localhost:3000/admin/products/${productId}/analytics`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Response

```typescript
interface ProductAnalyticsResponse {
  success: boolean;
  data: {
    productId: string;
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
    viewCount: number;
    conversionRate: number;
    salesTrend: Array<{
      month: string; // Format: "YYYY-MM"
      sales: number;
      revenue: number;
    }>;
  };
}
```

### Response Example

```json
{
  "success": true,
  "data": {
    "productId": "550e8400-e29b-41d4-a716-446655440000",
    "totalSales": 234,
    "totalRevenue": 1053000,
    "averageRating": 4.7,
    "totalReviews": 89,
    "viewCount": 5678,
    "conversionRate": 4.12,
    "salesTrend": [
      {
        "month": "2024-01",
        "sales": 67,
        "revenue": 301500
      },
      {
        "month": "2024-02",
        "sales": 82,
        "revenue": 369000
      },
      {
        "month": "2024-03",
        "sales": 85,
        "revenue": 382500
      }
    ]
  }
}
```

---

## 🎨 Frontend Implementation Examples

### React/TypeScript Example

```typescript
// types/product.ts
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  costPrice: number;
  originalPrice: number | null;
  category: string;
  material: string | null;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  variants: {
    colors?: string[];
    sizes?: string[];
  } | null;
  badge: string | null;
  status: 'active' | 'inactive' | 'draft';
  rating: number;
  reviewCount: number;
  totalSales: number;
  totalRevenue: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  profitMargin?: string;
  inStock?: boolean;
  isLowStock?: boolean;
}

// api/products.ts
const API_BASE = 'http://localhost:3000';

export const productApi = {
  // Get all products
  getProducts: async (params?: {
    category?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(
      `${API_BASE}/admin/products?${queryString}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.json();
  },

  // Get single product
  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE}/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  // Create product
  createProduct: async (data: Partial<Product>) => {
    const response = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Update product
  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Delete product
  deleteProduct: async (id: string) => {
    const response = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.json();
  },

  // Get analytics
  getAnalytics: async (id: string) => {
    const response = await fetch(
      `${API_BASE}/admin/products/${id}/analytics`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.json();
  }
};

// components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="sku">SKU: {product.sku}</p>
      <p className="price">${(product.price / 100).toFixed(2)}</p>
      <p className="stock">
        Stock: {product.stock}
        {product.isLowStock && <span className="low-stock">Low Stock</span>}
      </p>
      <div className="badges">
        {product.badge && <span className="badge">{product.badge}</span>}
        <span className={`status ${product.status}`}>{product.status}</span>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(product.id)}>Edit</button>
        <button onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
};

// components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { productApi } from '../api/products';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProducts({ page, limit: 20 });
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await productApi.deleteProduct(id);
      loadProducts();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={(id) => console.log('Edit', id)}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

---

## ⚠️ Error Responses

All endpoints may return error responses:

### 400 Bad Request (Validation Error)

```json
{
  "statusCode": 400,
  "message": ["price must be a positive number", "sku should not be empty"],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden (Not Admin)

```json
{
  "statusCode": 403,
  "message": "Admin access required",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Product with ID xyz not found",
  "error": "Not Found"
}
```

### 409 Conflict (Duplicate SKU)

```json
{
  "statusCode": 409,
  "message": "Product with SKU HB-LS-001 already exists",
  "error": "Conflict"
}
```

---

## 💡 Tips for Frontend Implementation

### 1. Price Display

Prices are stored in smallest currency unit (cents). Convert for display:

```javascript
const displayPrice = (price) => `$${(price / 100).toFixed(2)}`;
```

### 2. Date Formatting

Dates are in ISO 8601 format. Use a library like `date-fns`:

```javascript
import { format } from "date-fns";
const formattedDate = format(new Date(product.createdAt), "MMM dd, yyyy");
```

### 3. Image Handling

Images are stored as URLs. Handle missing images:

```javascript
const imageUrl = product.images[0] || "/placeholder.jpg";
```

### 4. Stock Status

Use calculated fields for UI:

```javascript
const stockStatus =
  product.stock === 0
    ? "Out of Stock"
    : product.isLowStock
      ? "Low Stock"
      : "In Stock";
```

### 5. Pagination

Implement pagination controls:

```javascript
const totalPages = Math.ceil(totalItems / itemsPerPage);
```

### 6. Search Debouncing

Debounce search input to avoid excessive API calls:

```javascript
const debouncedSearch = debounce((value) => {
  productApi.getProducts({ search: value });
}, 500);
```

---

## 🎯 Quick Reference

### Status Values

- `active` - Product is live and available
- `inactive` - Product is hidden from customers
- `draft` - Product is being prepared

### Sort Options

- `name` - Alphabetical
- `price` - By price
- `stock` - By stock quantity
- `createdAt` - By creation date
- `totalSales` - By sales count

### Common Filters

```javascript
// Active products only
?status=active

// In stock only
?inStock=true

// By category
?category=Men's Fashion

// Search
?search=linen

// Combine filters
?status=active&inStock=true&category=Men's Fashion&search=shirt
```

---

**Need help?** Check the main documentation files for more details! 🚀
