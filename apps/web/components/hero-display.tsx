"use client";

import { useCurrency } from '@/contexts/currency-context';

interface HeroDisplayProps {
  totalMonthly: number;
  subscriptionCount: number;
}

export function HeroDisplay({ totalMonthly, subscriptionCount }: HeroDisplayProps) {
  const { currency, getCurrencySymbol } = useCurrency();
  
  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold mb-2 text-muted-foreground">
        TOTAL MONTHLY SPEND
      </h2>
      <div className="mb-2">
        <p className="text-5xl md:text-6xl font-bold mb-2">
          {getCurrencySymbol(currency)} {totalMonthly.toFixed(2)}
        </p>
        <p className="text-muted-foreground text-sm md:text-base">
          Calculated from {subscriptionCount} active subscription{subscriptionCount !== 1 ? 's' : ''}
        </p>
      </div>
    </>
  );
}
