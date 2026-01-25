import { HeroDisplay } from './hero-display';
import { AddSubscriptionButton } from './add-subscription-button';

interface HeroSectionProps {
  totalMonthly: number;
  subscriptionCount: number;
}

export function HeroSection({ totalMonthly, subscriptionCount }: HeroSectionProps) {
  return (
    <div className="text-center pt-2 pb-8 mb-4">
      <HeroDisplay 
        totalMonthly={totalMonthly}
        subscriptionCount={subscriptionCount}
      />
      <AddSubscriptionButton />
    </div>
  );
}
