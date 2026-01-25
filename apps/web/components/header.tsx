'use client';

import { useState } from 'react';

export function Header() {
  const [currency, setCurrency] = useState('AED');

  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Subscription Tracker</h1>
        
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="h-10 px-4 rounded-lg border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="AED">AED</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>
    </header>
  );
}
