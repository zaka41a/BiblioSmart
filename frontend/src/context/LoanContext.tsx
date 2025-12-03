import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  borrowedDate: string;
  dueDate: string;
  returnedDate?: string;
}

interface LoanContextType {
  loans: Loan[];
  borrowBook: (userId: string, bookId: string) => void;
  returnBook: (loanId: string) => void;
  getUserLoans: (userId: string) => Loan[];
  getActiveLoan: (bookId: string) => Loan | undefined;
  isBookBorrowed: (bookId: string) => boolean;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>(() => {
    const savedLoans = localStorage.getItem("bibliosmart_loans");
    return savedLoans ? JSON.parse(savedLoans) : [];
  });

  useEffect(() => {
    localStorage.setItem("bibliosmart_loans", JSON.stringify(loans));
  }, [loans]);

  const borrowBook = (userId: string, bookId: string) => {
    const borrowedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

    const newLoan: Loan = {
      id: `loan-${Date.now()}`,
      userId,
      bookId,
      borrowedDate: borrowedDate.toISOString(),
      dueDate: dueDate.toISOString()
    };

    setLoans([...loans, newLoan]);
  };

  const returnBook = (loanId: string) => {
    setLoans(
      loans.map(loan =>
        loan.id === loanId
          ? { ...loan, returnedDate: new Date().toISOString() }
          : loan
      )
    );
  };

  const getUserLoans = (userId: string) => {
    return loans.filter(loan => loan.userId === userId && !loan.returnedDate);
  };

  const getActiveLoan = (bookId: string) => {
    return loans.find(loan => loan.bookId === bookId && !loan.returnedDate);
  };

  const isBookBorrowed = (bookId: string) => {
    return loans.some(loan => loan.bookId === bookId && !loan.returnedDate);
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        borrowBook,
        returnBook,
        getUserLoans,
        getActiveLoan,
        isBookBorrowed
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoans = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoans must be used within a LoanProvider");
  }
  return context;
};
