import type { Subscription } from '@/lib/types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

function getNextRenewalDate(renewalDay: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  let renewalDate = new Date(year, month, renewalDay);
  
  if (renewalDate <= now) {
    renewalDate = new Date(year, month + 1, renewalDay);
  }
  
  const daysUntil = Math.ceil((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntil === 0) return 'Renews today';
  if (daysUntil === 1) return 'Renews tomorrow';
  return `Renews in ${daysUntil} days`;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const renewalText = getNextRenewalDate(subscription.renewalDay);
  
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      {/* Icon */}
      <div className="shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-950 rounded-lg flex items-center justify-center">
        <span className="text-2xl">{subscription.iconKey === 'generic' ? '📦' : subscription.iconKey}</span>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">{subscription.name}</h3>
        <p className="text-sm text-muted-foreground">{renewalText}</p>
      </div>
      
      {/* Price and Actions */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-lg">${subscription.price.toFixed(2)}</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Edit subscription"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            </svg>
          </button>
          
          <button 
            className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
            aria-label="Delete subscription"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
