'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrency } from '@/contexts/currency-context';

export function Header() {
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Subscription Tracker</h1>
        
        <Select value={currency} onValueChange={setCurrency}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AED">AED</SelectItem>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
            <SelectItem value="INR">INR (₹)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
