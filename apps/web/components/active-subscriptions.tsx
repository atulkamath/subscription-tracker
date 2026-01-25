import type { Subscription } from '@/lib/types';
import { SubscriptionCard } from './subscription-card';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { CreditCard } from 'lucide-react';
import { DownloadReminderButton } from './download-reminder-button';

interface ActiveSubscriptionsProps {
  subscriptions: Subscription[];
}

export function ActiveSubscriptions({ subscriptions }: ActiveSubscriptionsProps) {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold whitespace-nowrap">
          Active subscriptions
        </h2>
        <DownloadReminderButton />
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
