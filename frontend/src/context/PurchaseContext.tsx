import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_ENDPOINTS } from "../config/api";

export interface Purchase {
  id: string;
  userId: string;
  bookId: string;
  purchaseDate: string;
  price: number;
  book?: {
    id: string;
    title: string;
    author: string;
    coverUrl?: string;
    price: number;
  };
}

interface PurchaseContextType {
  purchases: Purchase[];
  isLoading: boolean;
  error: string | null;
  purchaseBook: (bookId: string) => Promise<boolean>;
  removePurchase: (purchaseId: string) => Promise<boolean>;
  getUserPurchases: () => Purchase[];
  hasUserPurchased: (bookId: string) => boolean;
  canUserAccessBook: (bookId: string, bookPrice: number) => boolean;
  refreshPurchases: () => Promise<void>;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get auth token from localStorage
  const getAuthToken = (): string | null => {
    const user = localStorage.getItem("bibliosmart_user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.token || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  // Fetch user's purchases from API
  const fetchPurchases = async () => {
    const token = getAuthToken();

    if (!token) {
      setIsLoading(false);
      setPurchases([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_ENDPOINTS.purchases}/my-purchases`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch purchases");
      }

      const data = await response.json();

      if (data.success && data.data?.purchases) {
        setPurchases(data.data.purchases);
      }
    } catch (err: any) {
      console.error("Failed to load purchases:", err);
      setError(err.message || "Failed to load purchases");
      setPurchases([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load purchases on mount and when user changes
  useEffect(() => {
    fetchPurchases();
  }, []);

  const purchaseBook = async (bookId: string): Promise<boolean> => {
    try {
      const token = getAuthToken();

      if (!token) {
        setError("Vous devez être connecté pour acheter un livre");
        return false;
      }

      const response = await fetch(`${API_ENDPOINTS.purchases}/direct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({ bookId })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to purchase book");
      }

      // Refresh purchases list
      await fetchPurchases();
      return true;
    } catch (err: any) {
      console.error("Purchase failed:", err);
      setError(err.message || "Failed to purchase book");
      return false;
    }
  };

  const removePurchase = async (purchaseId: string): Promise<boolean> => {
    try {
      const token = getAuthToken();

      if (!token) {
        setError("Vous devez être connecté");
        return false;
      }

      const response = await fetch(`${API_ENDPOINTS.purchases}/${purchaseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to remove purchase");
      }

      // Refresh purchases list
      await fetchPurchases();
      return true;
    } catch (err: any) {
      console.error("Remove purchase failed:", err);
      setError(err.message || "Failed to remove purchase");
      return false;
    }
  };

  const getUserPurchases = () => {
    return purchases;
  };

  const hasUserPurchased = (bookId: string) => {
    return purchases.some(purchase => purchase.bookId === bookId);
  };

  const canUserAccessBook = (bookId: string, bookPrice: number) => {
    // Free books are accessible to everyone
    if (bookPrice === 0 || bookPrice === undefined || bookPrice === null) {
      return true;
    }

    // Paid books require purchase
    return hasUserPurchased(bookId);
  };

  const refreshPurchases = async () => {
    await fetchPurchases();
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        isLoading,
        error,
        purchaseBook,
        removePurchase,
        getUserPurchases,
        hasUserPurchased,
        canUserAccessBook,
        refreshPurchases
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchases must be used within a PurchaseProvider");
  }
  return context;
};
