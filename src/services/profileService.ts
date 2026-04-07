import apiClient from "./authService";

// Profile API interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  membershipTier: string;
  totalOrders: number;
  savedItems: number;
  loyaltyPoints: number;
  dateOfBirth?: string;
  addresses: Address[];
}

interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  orderId?: string;
  rating?: number;
  metadata?: any;
}

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
}

// Profile Service
export const profileService = {
  /**
   * Get user profile
   */
  async getProfile(): Promise<{ success: boolean; data: UserProfile }> {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest): Promise<any> {
    const response = await apiClient.patch("/users/profile", data);
    return response.data;
  },

  /**
   * Get recent activity
   */
  async getActivity(): Promise<{
    success: boolean;
    data: { activities: Activity[] };
  }> {
    const response = await apiClient.get("/users/activity");
    return response.data;
  },

  /**
   * Get user addresses
   */
  async getAddresses(): Promise<{
    success: boolean;
    data: { addresses: Address[] };
  }> {
    const response = await apiClient.get("/addresses");
    return response.data;
  },

  /**
   * Add new address
   */
  async addAddress(address: Omit<Address, "id">): Promise<any> {
    const response = await apiClient.post("/addresses", address);
    return response.data;
  },

  /**
   * Update address
   */
  async updateAddress(id: string, address: Partial<Address>): Promise<any> {
    const response = await apiClient.patch(`/addresses/${id}`, address);
    return response.data;
  },

  /**
   * Delete address
   */
  async deleteAddress(id: string): Promise<any> {
    const response = await apiClient.delete(`/addresses/${id}`);
    return response.data;
  },
};
