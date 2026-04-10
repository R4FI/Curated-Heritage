# Heritage Store - Admin API Documentation

## Base URL

```
https://api.heritage-store.com/v1/admin
```

## Authentication

All admin endpoints require:

1. Bearer token in the Authorization header
2. Admin role privileges

```
Authorization: Bearer <admin_access_token>
X-Admin-Role: admin
```

---

## 1. ADMIN DASHBOARD API

### 1.1 Get Dashboard Overview

**Endpoint:** `GET /dashboard/overview`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "revenue": {
      "today": 45000,
      "thisWeek": 285000,
      "thisMonth": 1250000,
      "growth": 12.5
    },
    "orders": {
      "total": 1247,
      "pending": 23,
      "processing": 45,
      "shipped": 89,
      "delivered": 1090,
      "todayCount": 12
    },
    "customers": {
      "total": 3456,
      "active": 892,
      "new": 45,
      "growth": 8.3
    },
    "products": {
      "total": 156,
      "inStock": 142,
      "lowStock": 8,
      "outOfStock": 6
    },
    "topSellingProducts": [
      {
        "id": "1",
        "name": "Heritage Linen Over-shirt",
        "sales": 234,
        "revenue": 1053000
      }
    ]
  }
}
```

### 1.2 Get Revenue Analytics

**Endpoint:** `GET /dashboard/analytics/revenue`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `period` (optional): daily, weekly, monthly, yearly (default: monthly)
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)

**Response:**

```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "totalRevenue": 1250000,
    "averageOrderValue": 12450,
    "chartData": [
      {
        "date": "2024-01",
        "revenue": 980000,
        "orders": 89
      },
      {
        "date": "2024-02",
        "revenue": 1120000,
        "orders": 102
      },
      {
        "date": "2024-03",
        "revenue": 1250000,
        "orders": 115
      }
    ]
  }
}
```

### 1.3 Get Sales Analytics

**Endpoint:** `GET /dashboard/analytics/sales`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `period` (optional): daily, weekly, monthly (default: monthly)
- `category` (optional): Filter by product category

**Response:**

```json
{
  "success": true,
  "data": {
    "totalSales": 1247,
    "conversionRate": 3.2,
    "averageItemsPerOrder": 2.4,
    "categoryBreakdown": [
      {
        "category": "Men's Fashion",
        "sales": 456,
        "revenue": 520000,
        "percentage": 36.6
      },
      {
        "category": "Women's Fashion",
        "sales": 389,
        "revenue": 445000,
        "percentage": 31.2
      }
    ]
  }
}
```

---

## 2. ADMIN PRODUCTS API

### 2.1 Get All Products (Admin View)

**Endpoint:** `GET /products`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `category` (optional): Filter by category
- `status` (optional): active, inactive, draft
- `inStock` (optional): true, false
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): name, price, stock, createdAt
- `sortOrder` (optional): asc, desc

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "1",
        "name": "Heritage Linen Over-shirt",
        "sku": "HB-LS-001",
        "price": 4500,
        "cost": 2800,
        "category": "Men's Fashion",
        "image": "/images/product-overshirt.jpg",
        "stock": 45,
        "lowStockThreshold": 10,
        "status": "active",
        "totalSales": 234,
        "revenue": 1053000,
        "rating": 4.7,
        "reviews": 89,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-03-20T14:22:00Z"
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

### 2.2 Create Product

**Endpoint:** `POST /products`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "name": "Handwoven Cotton Scarf",
  "sku": "HB-SC-015",
  "description": "Beautiful handwoven cotton scarf with traditional patterns",
  "price": 1200,
  "cost": 750,
  "originalPrice": 1500,
  "category": "Accessories",
  "material": "Organic Cotton",
  "stock": 50,
  "lowStockThreshold": 10,
  "images": ["/images/product-scarf-1.jpg", "/images/product-scarf-2.jpg"],
  "variants": {
    "colors": ["Red", "Blue", "Green"],
    "sizes": ["One Size"]
  },
  "badge": "New Arrival",
  "status": "active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "16",
    "name": "Handwoven Cotton Scarf",
    "sku": "HB-SC-015",
    "status": "active",
    "createdAt": "2024-03-25T10:00:00Z"
  }
}
```

### 2.3 Update Product

**Endpoint:** `PATCH /products/:id`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "price": 1350,
  "stock": 45,
  "status": "active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "16",
    "updatedFields": ["price", "stock", "status"],
    "updatedAt": "2024-03-25T11:30:00Z"
  }
}
```

### 2.4 Delete Product

**Endpoint:** `DELETE /products/:id`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 2.5 Bulk Update Products

**Endpoint:** `PATCH /products/bulk`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "productIds": ["1", "2", "3"],
  "updates": {
    "status": "active",
    "category": "Men's Fashion"
  }
}
```

**Response:**

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

### 2.6 Get Product Analytics

**Endpoint:** `GET /products/:id/analytics`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "productId": "1",
    "totalSales": 234,
    "totalRevenue": 1053000,
    "averageRating": 4.7,
    "totalReviews": 89,
    "viewCount": 5678,
    "conversionRate": 4.1,
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

## 3. ADMIN ORDERS API

### 3.1 Get All Orders

**Endpoint:** `GET /orders`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `status` (optional): Pending, Processing, Shipped, Delivered, Cancelled
- `paymentStatus` (optional): Pending, Paid, Failed, Refunded
- `startDate` (optional): Filter orders from date
- `endDate` (optional): Filter orders to date
- `customerId` (optional): Filter by customer ID
- `search` (optional): Search by order ID or customer name
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "HB-92841",
        "customerId": "user_123",
        "customerName": "Anika Rahman",
        "customerEmail": "anika.rahman@heritage.com",
        "status": "Processing",
        "paymentStatus": "Paid",
        "paymentMethod": "Visa ****4242",
        "total": 12450,
        "itemCount": 2,
        "shippingAddress": {
          "city": "Dhaka",
          "country": "Bangladesh"
        },
        "createdAt": "2024-03-20T15:30:00Z",
        "updatedAt": "2024-03-20T16:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 63,
      "totalItems": 1247,
      "itemsPerPage": 20
    },
    "summary": {
      "totalOrders": 1247,
      "totalRevenue": 15534750,
      "averageOrderValue": 12450
    }
  }
}
```

### 3.2 Get Order Details

**Endpoint:** `GET /orders/:orderId`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "HB-92841",
    "customerId": "user_123",
    "customer": {
      "id": "user_123",
      "name": "Anika Rahman",
      "email": "anika.rahman@heritage.com",
      "phone": "+880 1711-223344",
      "totalOrders": 24,
      "lifetimeValue": 298800
    },
    "status": "Processing",
    "paymentStatus": "Paid",
    "paymentMethod": "Visa ****4242",
    "items": [
      {
        "productId": "1",
        "name": "Heritage Linen Over-shirt",
        "image": "/images/product-overshirt.jpg",
        "sku": "HB-LS-001",
        "quantity": 1,
        "price": 4500,
        "cost": 2800,
        "variant": "Olive Green / Large",
        "subtotal": 4500
      }
    ],
    "shippingAddress": {
      "fullName": "Anika Rahman",
      "addressLine1": "House 42, Road 7, Block D",
      "addressLine2": "Banani Residential Area",
      "city": "Dhaka",
      "postalCode": "1213",
      "country": "Bangladesh",
      "phone": "+880 1711-223344"
    },
    "subtotal": 12000,
    "shipping": 150,
    "vat": 600,
    "discount": 300,
    "total": 12450,
    "profit": 5850,
    "promoCode": "HERITAGE10",
    "trackingNumber": null,
    "notes": [],
    "timeline": [
      {
        "status": "Order Placed",
        "date": "2024-03-20T15:30:00Z",
        "updatedBy": "system"
      },
      {
        "status": "Processing",
        "date": "2024-03-20T16:00:00Z",
        "updatedBy": "admin_001"
      }
    ],
    "createdAt": "2024-03-20T15:30:00Z",
    "updatedAt": "2024-03-20T16:00:00Z"
  }
}
```

### 3.3 Update Order Status

**Endpoint:** `PATCH /orders/:orderId/status`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "status": "Shipped",
  "trackingNumber": "TRK123456789",
  "notes": "Shipped via DHL Express"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "orderId": "HB-92841",
    "status": "Shipped",
    "trackingNumber": "TRK123456789",
    "updatedAt": "2024-03-21T10:00:00Z"
  }
}
```

### 3.4 Cancel Order

**Endpoint:** `POST /orders/:orderId/cancel`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "reason": "Customer requested cancellation",
  "refundAmount": 12450,
  "restockItems": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "orderId": "HB-92841",
    "status": "Cancelled",
    "refundStatus": "Processing",
    "refundAmount": 12450
  }
}
```

### 3.5 Process Refund

**Endpoint:** `POST /orders/:orderId/refund`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "amount": 12450,
  "reason": "Product defect",
  "refundMethod": "original"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Refund processed successfully",
  "data": {
    "refundId": "REF-12345",
    "orderId": "HB-92841",
    "amount": 12450,
    "status": "Completed",
    "processedAt": "2024-03-22T14:00:00Z"
  }
}
```

### 3.6 Add Order Note

**Endpoint:** `POST /orders/:orderId/notes`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "note": "Customer called to confirm delivery address",
  "isInternal": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Note added successfully",
  "data": {
    "noteId": "note_123",
    "createdBy": "admin_001",
    "createdAt": "2024-03-20T17:00:00Z"
  }
}
```

---

## 4. ADMIN CUSTOMERS API

### 4.1 Get All Customers

**Endpoint:** `GET /customers`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `status` (optional): active, inactive, blocked
- `membershipTier` (optional): Basic, Premium, VIP
- `search` (optional): Search by name, email, phone
- `sortBy` (optional): name, totalOrders, lifetimeValue, createdAt
- `sortOrder` (optional): asc, desc
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**

```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "user_123",
        "name": "Anika Rahman",
        "email": "anika.rahman@heritage.com",
        "phone": "+880 1711-223344",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anika",
        "status": "active",
        "membershipTier": "Premium",
        "totalOrders": 24,
        "lifetimeValue": 298800,
        "averageOrderValue": 12450,
        "lastOrderDate": "2024-03-20T15:30:00Z",
        "memberSince": "2021-05-15T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 173,
      "totalItems": 3456,
      "itemsPerPage": 20
    }
  }
}
```

### 4.2 Get Customer Details

**Endpoint:** `GET /customers/:customerId`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "name": "Anika Rahman",
    "email": "anika.rahman@heritage.com",
    "phone": "+880 1711-223344",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anika",
    "status": "active",
    "membershipTier": "Premium",
    "memberSince": "2021-05-15T10:00:00Z",
    "statistics": {
      "totalOrders": 24,
      "lifetimeValue": 298800,
      "averageOrderValue": 12450,
      "totalSpent": 298800,
      "totalRefunds": 0,
      "cancelledOrders": 1
    },
    "recentOrders": [
      {
        "id": "HB-92841",
        "date": "2024-03-20T15:30:00Z",
        "status": "Processing",
        "total": 12450
      }
    ],
    "addresses": [
      {
        "id": "addr_1",
        "fullName": "Anika Rahman",
        "addressLine1": "House 42, Road 7, Block D",
        "city": "Dhaka",
        "country": "Bangladesh",
        "isDefault": true
      }
    ],
    "paymentMethods": [
      {
        "id": "card_1",
        "type": "VISA",
        "last4": "4242",
        "isPrimary": true
      }
    ],
    "activityLog": [
      {
        "type": "order_placed",
        "description": "Placed order HB-92841",
        "timestamp": "2024-03-20T15:30:00Z"
      }
    ]
  }
}
```

### 4.3 Update Customer Status

**Endpoint:** `PATCH /customers/:customerId/status`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "status": "blocked",
  "reason": "Fraudulent activity detected"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Customer status updated successfully",
  "data": {
    "customerId": "user_123",
    "status": "blocked",
    "updatedAt": "2024-03-25T10:00:00Z"
  }
}
```

### 4.4 Update Membership Tier

**Endpoint:** `PATCH /customers/:customerId/membership`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "tier": "VIP",
  "reason": "Reached lifetime value threshold"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Membership tier updated successfully",
  "data": {
    "customerId": "user_123",
    "tier": "VIP",
    "updatedAt": "2024-03-25T10:00:00Z"
  }
}
```

---

## 5. ADMIN INVENTORY API

### 5.1 Get Inventory Overview

**Endpoint:** `GET /inventory/overview`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "totalProducts": 156,
    "inStock": 142,
    "lowStock": 8,
    "outOfStock": 6,
    "totalValue": 4567800,
    "alerts": [
      {
        "productId": "5",
        "name": "Ceramic Vase",
        "currentStock": 3,
        "threshold": 10,
        "status": "low"
      }
    ]
  }
}
```

### 5.2 Update Stock

**Endpoint:** `PATCH /inventory/:productId/stock`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "quantity": 50,
  "operation": "add",
  "reason": "New stock received",
  "cost": 2800
}
```

**Response:**

```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    "productId": "1",
    "previousStock": 45,
    "newStock": 95,
    "updatedAt": "2024-03-25T10:00:00Z"
  }
}
```

### 5.3 Get Stock History

**Endpoint:** `GET /inventory/:productId/history`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "productId": "1",
    "currentStock": 95,
    "history": [
      {
        "id": "stock_log_123",
        "operation": "add",
        "quantity": 50,
        "previousStock": 45,
        "newStock": 95,
        "reason": "New stock received",
        "updatedBy": "admin_001",
        "timestamp": "2024-03-25T10:00:00Z"
      },
      {
        "id": "stock_log_122",
        "operation": "subtract",
        "quantity": 1,
        "previousStock": 46,
        "newStock": 45,
        "reason": "Order HB-92841",
        "updatedBy": "system",
        "timestamp": "2024-03-20T15:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 89
    }
  }
}
```

### 5.4 Set Low Stock Alert

**Endpoint:** `PATCH /inventory/:productId/alert-threshold`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "threshold": 15
}
```

**Response:**

```json
{
  "success": true,
  "message": "Alert threshold updated successfully",
  "data": {
    "productId": "1",
    "threshold": 15
  }
}
```

---

## 6. ADMIN ANALYTICS API

### 6.1 Get Sales Report

**Endpoint:** `GET /analytics/sales-report`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `startDate` (required): Report start date
- `endDate` (required): Report end date
- `groupBy` (optional): day, week, month (default: day)

**Response:**

```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-03-01T00:00:00Z",
      "end": "2024-03-31T23:59:59Z"
    },
    "summary": {
      "totalRevenue": 1250000,
      "totalOrders": 115,
      "averageOrderValue": 10870,
      "totalProfit": 487500,
      "profitMargin": 39
    },
    "chartData": [
      {
        "date": "2024-03-01",
        "revenue": 45000,
        "orders": 4,
        "profit": 17550
      }
    ],
    "topProducts": [
      {
        "productId": "1",
        "name": "Heritage Linen Over-shirt",
        "sales": 85,
        "revenue": 382500
      }
    ],
    "topCategories": [
      {
        "category": "Men's Fashion",
        "sales": 42,
        "revenue": 520000
      }
    ]
  }
}
```

### 6.2 Get Customer Analytics

**Endpoint:** `GET /analytics/customers`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `period` (optional): 7d, 30d, 90d, 1y (default: 30d)

**Response:**

```json
{
  "success": true,
  "data": {
    "totalCustomers": 3456,
    "newCustomers": 45,
    "activeCustomers": 892,
    "churnRate": 2.3,
    "retentionRate": 87.5,
    "averageLifetimeValue": 86458,
    "customersByTier": {
      "Basic": 2456,
      "Premium": 892,
      "VIP": 108
    },
    "topCustomers": [
      {
        "customerId": "user_456",
        "name": "Zahid Hossain",
        "lifetimeValue": 456000,
        "totalOrders": 38
      }
    ]
  }
}
```

### 6.3 Get Product Performance

**Endpoint:** `GET /analytics/product-performance`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `period` (optional): 7d, 30d, 90d, 1y (default: 30d)
- `sortBy` (optional): revenue, sales, profit, views
- `limit` (optional): Number of products (default: 10)

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "productId": "1",
        "name": "Heritage Linen Over-shirt",
        "sales": 85,
        "revenue": 382500,
        "profit": 144500,
        "profitMargin": 37.8,
        "views": 2345,
        "conversionRate": 3.6,
        "averageRating": 4.7,
        "returnRate": 1.2
      }
    ]
  }
}
```

---

## 7. ADMIN REVIEWS API

### 7.1 Get All Reviews

**Endpoint:** `GET /reviews`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `productId` (optional): Filter by product
- `rating` (optional): Filter by rating (1-5)
- `status` (optional): pending, approved, rejected
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_123",
        "productId": "1",
        "productName": "Heritage Linen Over-shirt",
        "customerId": "user_123",
        "customerName": "Anika Rahman",
        "rating": 5,
        "title": "Excellent quality!",
        "comment": "Beautiful craftsmanship and comfortable fabric.",
        "status": "approved",
        "helpful": 12,
        "createdAt": "2024-03-15T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 45,
      "totalItems": 892
    }
  }
}
```

### 7.2 Moderate Review

**Endpoint:** `PATCH /reviews/:reviewId/moderate`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "status": "approved",
  "moderatorNote": "Review meets guidelines"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review moderated successfully",
  "data": {
    "reviewId": "review_123",
    "status": "approved",
    "moderatedBy": "admin_001",
    "moderatedAt": "2024-03-25T10:00:00Z"
  }
}
```

### 7.3 Delete Review

**Endpoint:** `DELETE /reviews/:reviewId`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "reason": "Violates community guidelines"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## 8. ADMIN PROMO CODES API

### 8.1 Get All Promo Codes

**Endpoint:** `GET /promo-codes`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `status` (optional): active, expired, disabled
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "promoCodes": [
      {
        "id": "promo_1",
        "code": "HERITAGE10",
        "description": "10% off on all products",
        "discountType": "percentage",
        "discountValue": 10,
        "minPurchase": 10000,
        "maxDiscount": 2000,
        "usageLimit": 1000,
        "usageCount": 234,
        "status": "active",
        "startDate": "2024-01-01T00:00:00Z",
        "expiresAt": "2024-12-31T23:59:59Z",
        "createdAt": "2023-12-15T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 45
    }
  }
}
```

### 8.2 Create Promo Code

**Endpoint:** `POST /promo-codes`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "code": "SUMMER25",
  "description": "Summer sale - 25% off",
  "discountType": "percentage",
  "discountValue": 25,
  "minPurchase": 5000,
  "maxDiscount": 5000,
  "usageLimit": 500,
  "startDate": "2024-06-01T00:00:00Z",
  "expiresAt": "2024-08-31T23:59:59Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Promo code created successfully",
  "data": {
    "id": "promo_5",
    "code": "SUMMER25",
    "status": "active",
    "createdAt": "2024-03-25T10:00:00Z"
  }
}
```

### 8.3 Update Promo Code

**Endpoint:** `PATCH /promo-codes/:id`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "usageLimit": 1000,
  "status": "active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Promo code updated successfully",
  "data": {
    "id": "promo_5",
    "updatedAt": "2024-03-25T11:00:00Z"
  }
}
```

### 8.4 Delete Promo Code

**Endpoint:** `DELETE /promo-codes/:id`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "message": "Promo code deleted successfully"
}
```

### 8.5 Get Promo Code Usage

**Endpoint:** `GET /promo-codes/:id/usage`
**Auth Required:** Yes (Admin)

**Query Parameters:**

- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "promoCode": "HERITAGE10",
    "totalUsage": 234,
    "usageLimit": 1000,
    "totalDiscount": 468000,
    "usageHistory": [
      {
        "orderId": "HB-92841",
        "customerId": "user_123",
        "customerName": "Anika Rahman",
        "discountAmount": 2000,
        "usedAt": "2024-03-20T15:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 12,
      "totalItems": 234
    }
  }
}
```

---

## 9. ADMIN SETTINGS API

### 9.1 Get Admin Settings

**Endpoint:** `GET /settings`
**Auth Required:** Yes (Admin)

**Response:**

```json
{
  "success": true,
  "data": {
    "general": {
      "storeName": "Heritage Store",
      "storeEmail": "admin@heritage-store.com",
      "storePhone": "+880 1711-223344",
      "currency": "BDT",
      "timezone": "Asia/Dhaka"
    },
    "shipping": {
      "freeShippingThreshold": 5000,
      "standardShippingCost": 150,
      "expressShippingCost": 300
    },
    "tax": {
      "vatRate": 5,
      "includeTaxInPrice": false
    },
    "notifications": {
      "orderNotifications": true,
      "lowStockAlerts": true,
      "reviewNotifications": true
    }
  }
}
```

### 9.2 Update Admin Settings

**Endpoint:** `PATCH /settings`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "general": {
    "storeName": "Heritage Store Bangladesh"
  },
  "shipping": {
    "freeShippingThreshold": 10000
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Settings updated successfully",
  "data": {
    "updatedAt": "2024-03-25T10:00:00Z"
  }
}
```

---

## 10. ADMIN USERS API

### 10.1 Get All Admin Users

**Endpoint:** `GET /admin-users`
**Auth Required:** Yes (Super Admin)

**Query Parameters:**

- `role` (optional): admin, super_admin, moderator
- `status` (optional): active, inactive
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "adminUsers": [
      {
        "id": "admin_001",
        "name": "Rafiq Ahmed",
        "email": "rafiq@heritage-store.com",
        "role": "super_admin",
        "status": "active",
        "lastLogin": "2024-03-25T09:00:00Z",
        "createdAt": "2023-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalItems": 5
    }
  }
}
```

### 10.2 Create Admin User

**Endpoint:** `POST /admin-users`
**Auth Required:** Yes (Super Admin)

**Request Body:**

```json
{
  "name": "Nadia Khan",
  "email": "nadia@heritage-store.com",
  "password": "SecureAdminPass123!",
  "role": "admin"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Admin user created successfully",
  "data": {
    "id": "admin_006",
    "name": "Nadia Khan",
    "email": "nadia@heritage-store.com",
    "role": "admin",
    "createdAt": "2024-03-25T10:00:00Z"
  }
}
```

### 10.3 Update Admin User

**Endpoint:** `PATCH /admin-users/:id`
**Auth Required:** Yes (Super Admin)

**Request Body:**

```json
{
  "role": "moderator",
  "status": "active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Admin user updated successfully",
  "data": {
    "id": "admin_006",
    "updatedAt": "2024-03-25T11:00:00Z"
  }
}
```

### 10.4 Delete Admin User

**Endpoint:** `DELETE /admin-users/:id`
**Auth Required:** Yes (Super Admin)

**Response:**

```json
{
  "success": true,
  "message": "Admin user deleted successfully"
}
```

---

## 11. ADMIN REPORTS API

### 11.1 Generate Sales Report

**Endpoint:** `POST /reports/sales`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "startDate": "2024-03-01T00:00:00Z",
  "endDate": "2024-03-31T23:59:59Z",
  "format": "pdf",
  "includeCharts": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "reportId": "report_123",
    "downloadUrl": "https://api.heritage-store.com/reports/download/report_123.pdf",
    "expiresAt": "2024-03-26T10:00:00Z"
  }
}
```

### 11.2 Generate Inventory Report

**Endpoint:** `POST /reports/inventory`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "category": "All",
  "stockStatus": "all",
  "format": "csv"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "reportId": "report_124",
    "downloadUrl": "https://api.heritage-store.com/reports/download/report_124.csv",
    "expiresAt": "2024-03-26T10:00:00Z"
  }
}
```

### 11.3 Generate Customer Report

**Endpoint:** `POST /reports/customers`
**Auth Required:** Yes (Admin)

**Request Body:**

```json
{
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-03-31T23:59:59Z",
  "membershipTier": "All",
  "format": "xlsx"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "reportId": "report_125",
    "downloadUrl": "https://api.heritage-store.com/reports/download/report_125.xlsx",
    "expiresAt": "2024-03-26T10:00:00Z"
  }
}
```

---

## Error Responses

All endpoints may return the following error structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": [
      {
        "field": "fieldName",
        "message": "Field-specific error message"
      }
    ]
  }
}
```

### Common Error Codes:

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Missing or invalid authentication
- `FORBIDDEN` (403): Insufficient admin permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists or conflict
- `INTERNAL_ERROR` (500): Server error
- `ADMIN_ONLY` (403): Endpoint requires admin privileges
- `SUPER_ADMIN_ONLY` (403): Endpoint requires super admin privileges

---

## Rate Limiting

- Rate limit: 200 requests per minute per admin user
- Rate limit headers included in response:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

## Admin Roles & Permissions

### Super Admin

- Full access to all endpoints
- Can manage admin users
- Can modify system settings

### Admin

- Manage products, orders, customers
- View analytics and reports
- Manage inventory
- Cannot manage admin users or critical settings

### Moderator

- Moderate reviews
- View orders and customers
- Limited product management
- Cannot access analytics or settings

---

## Audit Logging

All admin actions are logged with:

- Admin user ID
- Action performed
- Timestamp
- IP address
- Resource affected
- Changes made

Access audit logs via: `GET /admin/audit-logs`

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Currency amounts are in BDT (Bangladeshi Taka) unless specified
- Admin authentication tokens expire after 8 hours
- All destructive actions (DELETE) require confirmation
- Bulk operations are limited to 100 items per request
- Reports are generated asynchronously and expire after 24 hours

---

## MySQL Database Schema Reference (Admin Tables)

### Additional Admin Tables:

1. **admin_users** - Admin user accounts
2. **admin_roles** - Role definitions and permissions
3. **audit_logs** - Admin action logging
4. **reports** - Generated report metadata
5. **system_settings** - Store configuration
6. **stock_logs** - Inventory change history
7. **promo_code_usage** - Promo code usage tracking
8. **review_moderation** - Review moderation history
