import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Purchase {
  id: string;
  userId: string;
  bookId: string;
  purchaseDate: string;
  price: number;
}

interface PurchaseContextType {
  purchases: Purchase[];
  purchaseBook: (userId: string, bookId: string, price: number) => void;
  getUserPurchases: (userId: string) => Purchase[];
  hasUserPurchased: (userId: string, bookId: string) => boolean;
  canUserAccessBook: (userId: string, bookId: string, bookPrice: number) => boolean;
}

const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

export const PurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const savedPurchases = localStorage.getItem("bibliosmart_purchases");
    return savedPurchases ? JSON.parse(savedPurchases) : [];
  });

  useEffect(() => {
    localStorage.setItem("bibliosmart_purchases", JSON.stringify(purchases));
  }, [purchases]);

  const purchaseBook = (userId: string, bookId: string, price: number) => {
    const newPurchase: Purchase = {
      id: `purchase-${Date.now()}`,
      userId,
      bookId,
      purchaseDate: new Date().toISOString(),
      price
    };

    setPurchases([...purchases, newPurchase]);
  };

  const getUserPurchases = (userId: string) => {
    return purchases.filter(purchase => purchase.userId === userId);
  };

  const hasUserPurchased = (userId: string, bookId: string) => {
    return purchases.some(purchase => purchase.userId === userId && purchase.bookId === bookId);
  };

  const canUserAccessBook = (userId: string, bookId: string, bookPrice: number) => {
    // Free books are accessible to everyone
    if (bookPrice === 0) {
      return true;
    }

    // Paid books require purchase
    return hasUserPurchased(userId, bookId);
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        purchaseBook,
        getUserPurchases,
        hasUserPurchased,
        canUserAccessBook
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
