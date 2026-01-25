import type { Subscription } from '@/lib/types';
import { SubscriptionCard } from './subscription-card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

interface ActiveSubscriptionsProps {
  subscriptions: Subscription[];
}

export function ActiveSubscriptions({ subscriptions }: ActiveSubscriptionsProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Active subscriptions</h2>
      
      {subscriptions.length === 0 ? (
        <Empty className="border-2 border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </EmptyMedia>
            <EmptyTitle>No subscriptions yet</EmptyTitle>
            <EmptyDescription>
              Add your first subscription to start tracking your monthly spending
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-3">
          {subscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))}
        </div>
      )}
    </div>
  );
}
