/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./authService";

// Product interfaces based on PRODUCT-API-ADMIN.md
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
  status: "active" | "inactive" | "draft";
  rating: number;
  reviewCount: number;
  totalSales: number;
  totalRevenue: number;
  viewCount: number;
  supplier?: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  profitMargin?: string;
  inStock?: boolean;
  isLowStock?: boolean;
}

export interface ProductListResponse {
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

export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  description: string;
  price: number;
  cost: number;
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

export interface UpdateProductRequest {
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

export interface CreateProductResponse {
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

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    updatedFields: string[];
    updatedAt: string;
  };
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface BulkUpdateRequest {
  productIds: string[];
  updates: {
    status?: "active" | "inactive" | "draft";
    category?: string;
    badge?: string;
  };
}

export interface BulkUpdateResponse {
  success: boolean;
  message: string;
  data: {
    updatedCount: number;
    failedIds: string[];
  };
}

export interface ProductAnalyticsResponse {
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
      month: string;
      sales: number;
      revenue: number;
    }>;
  };
}

export interface ProductQueryParams {
  category?: string;
  status?: "active" | "inactive" | "draft";
  inStock?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "price" | "stock" | "createdAt" | "totalSales";
  sortOrder?: "asc" | "desc";
}

// Admin Product Service
export const adminProductService = {
  /**
   * Get all products with filters
   */
  async getProducts(params?: ProductQueryParams): Promise<ProductListResponse> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = `/admin/products${queryString ? `?${queryString}` : ""}`;

    const response = await apiClient.get<ProductListResponse>(url);
    return response.data;
  },

  /**
   * Get single product by ID
   */
  async getProduct(id: string): Promise<SingleProductResponse> {
    const response = await apiClient.get<SingleProductResponse>(
      `/admin/products/${id}`,
    );
    return response.data;
  },

  /**
   * Create new product
   */
  async createProduct(
    data: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const response = await apiClient.post<CreateProductResponse>(
      "/admin/products",
      data,
    );
    return response.data;
  },

  /**
   * Update product
   */
  async updateProduct(
    id: string,
    data: UpdateProductRequest,
  ): Promise<UpdateProductResponse> {
    const response = await apiClient.patch<UpdateProductResponse>(
      `/admin/products/${id}`,
      data,
    );
    return response.data;
  },

  /**
   * Delete product
   */
  async deleteProduct(id: string): Promise<DeleteProductResponse> {
    const response = await apiClient.delete<DeleteProductResponse>(
      `/admin/products/${id}`,
    );
    return response.data;
  },

  /**
   * Bulk update products
   */
  async bulkUpdateProducts(
    data: BulkUpdateRequest,
  ): Promise<BulkUpdateResponse> {
    const response = await apiClient.patch<BulkUpdateResponse>(
      "/admin/products/bulk/update",
      data,
    );
    return response.data;
  },

  /**
   * Get product analytics
   */
  async getProductAnalytics(id: string): Promise<ProductAnalyticsResponse> {
    const response = await apiClient.get<ProductAnalyticsResponse>(
      `/admin/products/${id}/analytics`,
    );
    return response.data;
  },
};

export default adminProductService;
