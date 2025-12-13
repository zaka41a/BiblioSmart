// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  logout: `${API_BASE_URL}/auth/logout`,

  // Books
  books: `${API_BASE_URL}/books`,
  bookById: (id: string) => `${API_BASE_URL}/books/${id}`,

  // Users
  users: `${API_BASE_URL}/users`,
  userById: (id: string) => `${API_BASE_URL}/users/${id}`,

  // Purchases
  purchases: `${API_BASE_URL}/purchases`,
  userPurchases: (userId: string) => `${API_BASE_URL}/purchases/user/${userId}`,
  directPurchase: `${API_BASE_URL}/purchases/direct`,
  purchaseStats: `${API_BASE_URL}/purchases/stats`,

  // Stripe
  createCheckout: `${API_BASE_URL}/stripe/create-checkout-session`,
  stripeSession: (sessionId: string) => `${API_BASE_URL}/stripe/session/${sessionId}`,

  // Health
  health: `${API_BASE_URL}/health`,
};

// API Helper Functions
export const apiRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || error.message || `HTTP ${response.status}`);
    }

    // Handle 204 No Content - no JSON to parse
    if (response.status === 204) {
      return {} as T;
    }

    // Check if response has content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // For non-JSON responses
    return {} as T;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
