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
import { CreditCard, Download } from 'lucide-react';

interface ActiveSubscriptionsProps {
  subscriptions: Subscription[];
}

export function ActiveSubscriptions({ subscriptions }: ActiveSubscriptionsProps) {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold whitespace-nowrap">Active subscriptions</h2>
        <button className="text-xs px-3 py-1.5 border rounded-lg hover:bg-accent transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0">
          <Download className="w-3.5 h-3.5" />
          Download reminder
        </button>
      </div>
      
      {subscriptions.length === 0 ? (
        <Empty className="border-2 border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CreditCard className="w-8 h-8" />
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
