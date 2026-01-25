interface HeroSectionProps {
  totalMonthly: number;
  subscriptionCount: number;
  currency: string;
}

export function HeroSection({ totalMonthly, subscriptionCount, currency }: HeroSectionProps) {
  return (
    <div className="text-center py-12 px-4">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-muted-foreground">
        Total Monthly Spend
      </h2>
      <div className="mb-2">
        <p className="text-5xl md:text-6xl font-bold mb-2">
          {currency === 'AED' && 'AED '}
          {currency === 'USD' && '$'}
          {currency === 'EUR' && '€'}
          {currency === 'GBP' && '£'}
          {currency === 'INR' && '₹'}
          {totalMonthly.toFixed(2)}
        </p>
        <p className="text-muted-foreground text-sm md:text-base">
          Calculated from {subscriptionCount} active subscription{subscriptionCount !== 1 ? 's' : ''}
        </p>
      </div>
      
      <button className="w-full max-w-md mt-8 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
        </svg>
        Add new subscription
      </button>
    </div>
  );
}
