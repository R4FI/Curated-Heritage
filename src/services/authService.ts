/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { authStorage } from "@/lib/secureStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/v1";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authStorage.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data.data;
          authStorage.setTokens(accessToken, refreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        authStorage.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Auth API interfaces
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    expiresIn: number;
  };
}

// Authentication Service
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  },

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      userData,
    );
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API call result
      authStorage.clearTokens();
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );
    return response.data;
  },

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordRequest): Promise<any> {
    const response = await apiClient.post("/auth/change-password", data);
    return response.data;
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<any> {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<any> {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<any> {
    const response = await apiClient.post("/auth/verify-email", { token });
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<any> {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },
};

export default apiClient;
