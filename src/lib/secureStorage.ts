/* eslint-disable @typescript-eslint/no-explicit-any */
import SecureLS from "secure-ls";
import { jwtDecode } from "jwt-decode";

// Initialize SecureLS with AES encryption
const ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret:
    import.meta.env.VITE_ENCRYPTION_KEY || "heritage-store-secret-key-2024",
});

interface DecodedToken {
  exp: number;
  userId: string;
  [key: string]: any;
}

export const secureStorage = {
  /**
   * Set encrypted item in localStorage
   */
  set: (key: string, value: any) => {
    try {
      ls.set(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get and decrypt item from localStorage
   */
  get: (key: string): any => {
    try {
      return ls.get(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key: string) => {
    try {
      ls.remove(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear: () => {
    try {
      ls.removeAll();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },

  /**
   * Check if token is expired (with 7-day grace period)
   */
  isTokenExpired: (token: string): boolean => {
    try {
      if (!token) return true;

      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      // Add 7 days (604800 seconds) grace period to token expiration
      const expirationWithGrace = decoded.exp + 7 * 24 * 60 * 60;

      return currentTime > expirationWithGrace;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },

  /**
   * Get valid access token (checks expiration)
   */
  getValidToken: async (): Promise<string | null> => {
    try {
      const token = secureStorage.get("accessToken");

      if (!token) {
        console.log("No access token found");
        return null;
      }

      // Check if token is expired
      if (secureStorage.isTokenExpired(token)) {
        console.log("Token expired, attempting refresh...");
        // Token refresh will be handled by axios interceptor
        return null;
      }

      return token;
    } catch (error) {
      console.error("Error getting valid token:", error);
      return null;
    }
  },
};

// Helper functions for common auth operations
export const authStorage = {
  /**
   * Set authentication tokens
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    secureStorage.set("accessToken", accessToken);
    secureStorage.set("refreshToken", refreshToken);
  },

  /**
   * Get access token
   */
  getAccessToken: (): string | null => {
    return secureStorage.get("accessToken");
  },

  /**
   * Get refresh token
   */
  getRefreshToken: (): string | null => {
    return secureStorage.get("refreshToken");
  },

  /**
   * Clear all authentication data
   */
  clearTokens: (): void => {
    secureStorage.remove("accessToken");
    secureStorage.remove("refreshToken");
    secureStorage.remove("user");
  },

  /**
   * Set user data
   */
  setUser: (user: any): void => {
    secureStorage.set("user", user);
  },

  /**
   * Get user data
   */
  getUser: (): any | null => {
    return secureStorage.get("user");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    try {
      const token = secureStorage.get("accessToken");
      // Just check if token exists, don't validate expiration
      // Token refresh will be handled by axios interceptor
      return !!token;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  },
};
