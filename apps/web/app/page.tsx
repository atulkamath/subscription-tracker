import { getSubscriptions } from '@/lib/api';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ActiveSubscriptions } from '@/components/active-subscriptions';

export default async function Home() {
  const subscriptions = await getSubscriptions();
  
  const totalMonthly = subscriptions.reduce((sum: number, sub) => sum + sub.price, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <HeroSection 
          totalMonthly={totalMonthly}
          subscriptionCount={subscriptions.length}
          currency="AED"
        />
        
        <ActiveSubscriptions subscriptions={subscriptions} />
      </main>
    </div>
  );
}
