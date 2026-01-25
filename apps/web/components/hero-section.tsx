'use client';

import { AddSubscriptionDrawer } from './add-subscription-drawer';
import { useCurrency } from '@/contexts/currency-context';
import { PlusCircle } from 'lucide-react';

interface HeroSectionProps {
  totalMonthly: number;
  subscriptionCount: number;
}

export function HeroSection({ totalMonthly, subscriptionCount }: HeroSectionProps) {
  const { currency, getCurrencySymbol } = useCurrency();
  
  return (
    <div className="text-center pt-2 pb-8 mb-4">
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
      
      <AddSubscriptionDrawer>
        <button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add new subscription
        </button>
      </AddSubscriptionDrawer>
    </div>
  );
}
