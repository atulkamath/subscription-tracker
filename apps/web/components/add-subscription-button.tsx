"use client";

import { AddSubscriptionDrawer } from './add-subscription-drawer';
import { PlusCircle } from 'lucide-react';

export function AddSubscriptionButton() {
  return (
    <AddSubscriptionDrawer>
      <button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
        <PlusCircle className="w-5 h-5" />
        Add new subscription
      </button>
    </AddSubscriptionDrawer>
  );
}
