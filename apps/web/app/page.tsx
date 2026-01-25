import { getSubscriptions } from '@/lib/api';
import { ClientLayout } from '@/components/client-layout';
import { ActiveSubscriptions } from '@/components/active-subscriptions';

export default async function Home() {
  const subscriptions = await getSubscriptions();
  
  const totalMonthly = subscriptions.reduce((sum: number, sub: any) => sum + sub.price, 0);

  return (
    <ClientLayout
      totalMonthly={totalMonthly}
      subscriptionCount={subscriptions.length}
      subscriptions={subscriptions}
    >
      <ActiveSubscriptions subscriptions={subscriptions} />
    </ClientLayout>
  );
}
