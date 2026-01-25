'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getCurrencySymbol: (currency: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('AED');

  const getCurrencySymbol = (currency: Currency): string => {
    const symbols: Record<Currency, string> = {
      AED: 'AED',
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
    };
    return symbols[currency];
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, getCurrencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
