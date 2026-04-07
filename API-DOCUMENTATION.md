# Heritage Store - API Documentation

## Base URL

```
https://api.heritage-store.com/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## 1. PRODUCTS API

### 1.1 Get All Products

**Endpoint:** `GET /products`

**Query Parameters:**

- `category` (optional): Filter by category (Men's Fashion, Women's Fashion, Home & Lifestyle, Gadgets, Accessories)
- `material` (optional): Filter by material
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `search` (optional): Search by product name or description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `sortBy` (optional): Sort field (price, rating, name)
- `sortOrder` (optional): asc or desc

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "1",
        "name": "Heritage Linen Over-shirt",
        "price": 4500,
        "originalPrice": null,
        "category": "Men's Fashion",
        "image": "/images/product-overshirt.jpg",
        "description": "Premium linen over-shirt with heritage stitching...",
        "badge": null,
        "rating": 4.7,
        "reviews": 89,
        "material": "Organic Cotton",
        "inStock": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-03-20T14:22:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 60,
      "itemsPerPage": 12
    }
  }
}
```

### 1.2 Get Product by ID

**Endpoint:** `GET /products/:id`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Heritage Linen Over-shirt",
    "price": 4500,
    "originalPrice": null,
    "category": "Men's Fashion",
    "image": "/images/product-overshirt.jpg",
    "description": "Premium linen over-shirt with heritage stitching...",
    "badge": null,
    "rating": 4.7,
    "reviews": 89,
    "material": "Organic Cotton",
    "inStock": true,
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Olive Green", "Navy Blue", "Beige"],
    "relatedProducts": ["2", "6", "11"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-03-20T14:22:00Z"
  }
}
```

### 1.3 Get Product Categories

**Endpoint:** `GET /products/categories`

**Response:**

```json
{
  "success": true,
  "data": {
    "categories": [
      "All",
      "Men's Fashion",
      "Women's Fashion",
      "Home & Lifestyle",
      "Gadgets",
      "Accessories"
    ]
  }
}
```

### 1.4 Get Product Materials

**Endpoint:** `GET /products/materials`

**Response:**

```json
{
  "success": true,
  "data": {
    "materials": [
      "Organic Cotton",
      "Hand-loomed Silk",
      "Jute Fiber",
      "Brass",
      "Leather",
      "Ceramic"
    ]
  }
}
```

---

## 2. CART API

### 2.1 Get Cart

**Endpoint:** `GET /cart`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart_item_1",
        "productId": "1",
        "product": {
          "id": "1",
          "name": "Heritage Linen Over-shirt",
          "price": 4500,
          "image": "/images/product-overshirt.jpg",
          "category": "Men's Fashion"
        },
        "quantity": 1,
        "variant": {
          "size": "L",
          "color": "Olive Green"
        },
        "subtotal": 4500
      }
    ],
    "summary": {
      "subtotal": 7600,
      "shipping": 120,
      "total": 7720,
      "itemCount": 2
    }
  }
}
```

### 2.2 Add to Cart

**Endpoint:** `POST /cart/items`
**Auth Required:** Yes

**Request Body:**

```json
{
  "productId": "1",
  "quantity": 1,
  "variant": {
    "size": "L",
    "color": "Olive Green"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "cartItemId": "cart_item_1",
    "productId": "1",
    "quantity": 1
  }
}
```

### 2.3 Update Cart Item

**Endpoint:** `PATCH /cart/items/:itemId`
**Auth Required:** Yes

**Request Body:**

```json
{
  "quantity": 2
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cart item updated",
  "data": {
    "cartItemId": "cart_item_1",
    "quantity": 2,
    "subtotal": 9000
  }
}
```

### 2.4 Remove from Cart

**Endpoint:** `DELETE /cart/items/:itemId`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 2.5 Clear Cart

**Endpoint:** `DELETE /cart`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 3. ORDERS API

### 3.1 Create Order (Checkout)

**Endpoint:** `POST /orders`
**Auth Required:** Yes

**Request Body:**

```json
{
  "shippingAddress": {
    "fullName": "Arif Rahman",
    "addressLine1": "House 42, Road 7, Block D",
    "addressLine2": "Banani Residential Area",
    "city": "Dhaka",
    "postalCode": "1213",
    "country": "Bangladesh",
    "phone": "+880 1711-223344"
  },
  "paymentMethod": {
    "type": "card",
    "cardId": "card_1"
  },
  "promoCode": "HERITAGE10"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "HB-92841",
    "status": "Processing",
    "items": [
      {
        "productId": "1",
        "name": "Heritage Linen Over-shirt",
        "quantity": 1,
        "price": 4500,
        "variant": "Olive Green / Large"
      }
    ],
    "subtotal": 17000,
    "shipping": 150,
    "vat": 850,
    "discount": 0,
    "total": 18000,
    "paymentStatus": "Pending",
    "createdAt": "2024-03-20T15:30:00Z"
  }
}
```

### 3.2 Get Order History

**Endpoint:** `GET /orders`
**Auth Required:** Yes

**Query Parameters:**

- `status` (optional): Filter by status (Processing, Shipped, Delivered)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "HB-92841",
        "date": "2024-03-20T15:30:00Z",
        "status": "Delivered",
        "total": 12450,
        "itemCount": 2,
        "trackingNumber": "TRK123456789"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 24
    }
  }
}
```

### 3.3 Get Order Details

**Endpoint:** `GET /orders/:orderId`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "HB-92841",
    "status": "Delivered",
    "date": "2024-03-20T15:30:00Z",
    "items": [
      {
        "productId": "1",
        "name": "Heritage Linen Over-shirt",
        "image": "/images/product-overshirt.jpg",
        "quantity": 1,
        "price": 4500,
        "variant": "Olive Green / Large"
      }
    ],
    "shippingAddress": {
      "fullName": "Arif Rahman",
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
    "paymentStatus": "Paid",
    "paymentMethod": "Visa ****4242",
    "trackingNumber": "TRK123456789",
    "timeline": [
      {
        "status": "Order Placed",
        "date": "2024-03-20T15:30:00Z"
      },
      {
        "status": "Processing",
        "date": "2024-03-20T16:00:00Z"
      },
      {
        "status": "Shipped",
        "date": "2024-03-21T10:00:00Z"
      },
      {
        "status": "Delivered",
        "date": "2024-03-24T14:30:00Z"
      }
    ]
  }
}
```

---

## 4. USER PROFILE API

### 4.1 Get User Profile

**Endpoint:** `GET /users/profile`
**Auth Required:** Yes

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
    "memberSince": "2021-05-15T10:00:00Z",
    "membershipTier": "Premium",
    "totalOrders": 24,
    "savedItems": 12,
    "loyaltyPoints": 2450,
    "addresses": [
      {
        "id": "addr_1",
        "fullName": "Anika Rahman",
        "addressLine1": "House 42, Road 7, Block D",
        "addressLine2": "Banani Residential Area",
        "city": "Dhaka",
        "postalCode": "1213",
        "country": "Bangladesh",
        "phone": "+880 1711-223344",
        "isDefault": true
      }
    ]
  }
}
```

### 4.2 Update User Profile

**Endpoint:** `PATCH /users/profile`
**Auth Required:** Yes

**Request Body:**

```json
{
  "name": "Anika Rahman",
  "phone": "+880 1711-223344",
  "dateOfBirth": "1995-06-15"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_123",
    "name": "Anika Rahman",
    "phone": "+880 1711-223344",
    "dateOfBirth": "1995-06-15"
  }
}
```

### 4.3 Get Recent Activity

**Endpoint:** `GET /users/activity`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": 1,
        "type": "delivered",
        "title": "Order Delivered: Artisanal Tea Set",
        "date": "2024-03-14T14:30:00Z",
        "orderId": "8920",
        "metadata": {}
      },
      {
        "id": 2,
        "type": "review",
        "title": "Review Submitted: Heritage Rug",
        "date": "2024-03-10T11:15:00Z",
        "rating": 5,
        "metadata": {
          "productId": "5"
        }
      },
      {
        "id": 3,
        "type": "points",
        "title": "Points Earned: +250 Credits",
        "date": "2024-03-08T09:00:00Z",
        "metadata": {
          "points": 250
        }
      }
    ]
  }
}
```

---

## 5. WISHLIST API

### 5.1 Get Wishlist

**Endpoint:** `GET /wishlist`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "wish_1",
        "productId": "1",
        "product": {
          "id": "1",
          "name": "Heritage Linen Over-shirt",
          "price": 4500,
          "originalPrice": null,
          "category": "Men's Fashion",
          "image": "/images/product-overshirt.jpg",
          "rating": 4.7,
          "reviews": 89,
          "inStock": true
        },
        "addedAt": "2024-03-15T10:00:00Z"
      }
    ],
    "totalItems": 6
  }
}
```

### 5.2 Add to Wishlist

**Endpoint:** `POST /wishlist`
**Auth Required:** Yes

**Request Body:**

```json
{
  "productId": "1"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Product added to wishlist",
  "data": {
    "wishlistItemId": "wish_1",
    "productId": "1"
  }
}
```

### 5.3 Remove from Wishlist

**Endpoint:** `DELETE /wishlist/:itemId`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Item removed from wishlist"
}
```

### 5.4 Move to Cart

**Endpoint:** `POST /wishlist/:itemId/move-to-cart`
**Auth Required:** Yes

**Request Body:**

```json
{
  "quantity": 1,
  "variant": {
    "size": "L",
    "color": "Olive Green"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Item moved to cart",
  "data": {
    "cartItemId": "cart_item_1"
  }
}
```

---

## 6. PAYMENT METHODS API

### 6.1 Get Payment Methods

**Endpoint:** `GET /payment-methods`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "card_1",
        "type": "VISA",
        "last4": "4242",
        "holder": "ZAHID HOSSAIN",
        "expiry": "09/26",
        "isPrimary": true
      },
      {
        "id": "card_2",
        "type": "Mastercard",
        "last4": "8819",
        "holder": "ZAHID HOSSAIN",
        "expiry": "12/25",
        "isPrimary": false
      }
    ],
    "digitalWallets": [
      {
        "id": "wallet_1",
        "name": "bKash Personal",
        "number": "+880 17** *** *88",
        "isActive": true
      },
      {
        "id": "wallet_2",
        "name": "Nagad Wallet",
        "number": null,
        "isActive": false
      }
    ]
  }
}
```

### 6.2 Add Payment Method

**Endpoint:** `POST /payment-methods`
**Auth Required:** Yes

**Request Body (Card):**

```json
{
  "type": "card",
  "cardNumber": "4242424242424242",
  "cardHolder": "ZAHID HOSSAIN",
  "expiryMonth": "09",
  "expiryYear": "26",
  "cvv": "123"
}
```

**Request Body (Digital Wallet):**

```json
{
  "type": "wallet",
  "provider": "bKash",
  "phoneNumber": "+880 1711223344"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment method added successfully",
  "data": {
    "id": "card_3",
    "type": "VISA",
    "last4": "4242"
  }
}
```

### 6.3 Set Primary Payment Method

**Endpoint:** `PATCH /payment-methods/:id/set-primary`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Primary payment method updated"
}
```

### 6.4 Delete Payment Method

**Endpoint:** `DELETE /payment-methods/:id`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Payment method deleted"
}
```

---

## 7. AUTHENTICATION API

### 7.1 Register

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "name": "Anika Rahman",
  "email": "anika.rahman@heritage.com",
  "password": "SecurePass123!",
  "phone": "+880 1711-223344"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": "user_123",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "name": "Anika Rahman",
      "email": "anika.rahman@heritage.com",
      "phone": "+880 1711-223344",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anika"
    }
  }
}
```

### 7.2 Login

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "anika.rahman@heritage.com",
  "password": "SecurePass123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "user_123",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "user_123",
      "name": "Anika Rahman",
      "email": "anika.rahman@heritage.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Anika"
    }
  }
}
```

### 7.3 Refresh Token

**Endpoint:** `POST /auth/refresh`

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 7.4 Logout

**Endpoint:** `POST /auth/logout`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 7.5 Change Password

**Endpoint:** `POST /auth/change-password`
**Auth Required:** Yes

**Request Body:**

```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 8. SETTINGS API

### 8.1 Get User Settings

**Endpoint:** `GET /settings`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "language": "en-US",
    "currency": "BDT",
    "notifications": {
      "promotional": true,
      "orderStatus": true,
      "feedback": false
    },
    "twoFactorEnabled": false
  }
}
```

### 8.2 Update Settings

**Endpoint:** `PATCH /settings`
**Auth Required:** Yes

**Request Body:**

```json
{
  "language": "bn",
  "currency": "USD",
  "notifications": {
    "promotional": true,
    "orderStatus": true,
    "feedback": true
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

### 8.3 Enable Two-Factor Authentication

**Endpoint:** `POST /settings/2fa/enable`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "2FA enabled successfully",
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "secret": "JBSWY3DPEHPK3PXP"
  }
}
```

---

## 9. ADDRESSES API

### 9.1 Get Addresses

**Endpoint:** `GET /addresses`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "id": "addr_1",
        "fullName": "Arif Rahman",
        "addressLine1": "House 42, Road 7, Block D",
        "addressLine2": "Banani Residential Area",
        "city": "Dhaka",
        "postalCode": "1213",
        "country": "Bangladesh",
        "phone": "+880 1711-223344",
        "isDefault": true
      }
    ]
  }
}
```

### 9.2 Add Address

**Endpoint:** `POST /addresses`
**Auth Required:** Yes

**Request Body:**

```json
{
  "fullName": "Arif Rahman",
  "addressLine1": "House 42, Road 7, Block D",
  "addressLine2": "Banani Residential Area",
  "city": "Dhaka",
  "postalCode": "1213",
  "country": "Bangladesh",
  "phone": "+880 1711-223344",
  "isDefault": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Address added successfully",
  "data": {
    "addressId": "addr_2"
  }
}
```

### 9.3 Update Address

**Endpoint:** `PATCH /addresses/:id`
**Auth Required:** Yes

**Request Body:**

```json
{
  "addressLine1": "House 45, Road 8, Block D",
  "isDefault": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Address updated successfully"
}
```

### 9.4 Delete Address

**Endpoint:** `DELETE /addresses/:id`
**Auth Required:** Yes

**Response:**

```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

---

## 10. PROMO CODES API

### 10.1 Validate Promo Code

**Endpoint:** `POST /promo-codes/validate`
**Auth Required:** Yes

**Request Body:**

```json
{
  "code": "HERITAGE10",
  "cartTotal": 15000
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "code": "HERITAGE10",
    "discountType": "percentage",
    "discountValue": 10,
    "discountAmount": 1500,
    "minPurchase": 10000,
    "maxDiscount": 2000,
    "expiresAt": "2024-12-31T23:59:59Z"
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
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes:

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Missing or invalid authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource already exists
- `INTERNAL_ERROR` (500): Server error

---

## Rate Limiting

- Rate limit: 100 requests per minute per IP
- Rate limit headers included in response:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

---

## MySQL Database Schema Reference

### Tables Structure:

1. **users** - User accounts
2. **products** - Product catalog
3. **categories** - Product categories
4. **materials** - Product materials
5. **cart** - Shopping cart
6. **cart_items** - Cart line items
7. **orders** - Order records
8. **order_items** - Order line items
9. **addresses** - User addresses
10. **payment_methods** - Saved payment methods
11. **wishlist** - User wishlist items
12. **reviews** - Product reviews
13. **promo_codes** - Promotional codes
14. **user_settings** - User preferences
15. **activity_log** - User activity tracking

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Currency amounts are in BDT (Bangladeshi Taka) unless specified
- Image URLs are relative paths; prepend with CDN base URL
- All IDs are strings for flexibility with various ID generation strategies
- Pagination defaults: page=1, limit=12
