"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Subscription } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Film,
  Dumbbell,
  ShoppingBag,
  Cloud,
  Laptop,
  FileText,
  LucideIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCurrency } from "@/contexts/currency-context";
import { AddSubscriptionDrawer } from "./add-subscription-drawer";

interface SubscriptionCardProps {
  subscription: Subscription;
}

const ICON_MAP: Record<string, LucideIcon> = {
  entertainment: Film,
  gym: Dumbbell,
  shopping: ShoppingBag,
  cloud: Cloud,
  software: Laptop,
  generic: FileText,
};

function getNextRenewalDate(renewalDay: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let renewalDate = new Date(year, month, renewalDay);

  if (renewalDate <= now) {
    renewalDate = new Date(year, month + 1, renewalDay);
  }

  const daysUntil = Math.ceil(
    (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysUntil === 0) return "Renews today";
  if (daysUntil === 1) return "Renews tomorrow";
  return `Renews in ${daysUntil} days`;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const router = useRouter();
  const renewalText = getNextRenewalDate(subscription.renewalDay);
  const Icon = ICON_MAP[subscription.iconKey] || ICON_MAP.generic;
  const { currency, getCurrencySymbol } = useCurrency();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/subscriptions/${subscription.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscription");
      }

      toast.success("Subscription deleted successfully!");
      router.refresh();
    } catch {
      toast.error("Failed to delete subscription");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      {/* Icon */}
      <div className="shrink-0 w-12 h-12 bg-cyan-100 dark:bg-cyan-950 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">
          {subscription.name}
        </h3>
        <p className="text-sm text-muted-foreground">{renewalText}</p>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="font-bold text-lg leading-tight">
          {getCurrencySymbol(currency)} {subscription.price.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground">MONTHLY</p>
      </div>

      {/* Actions */}
      <div className="flex ml-6">
        {/* <AddSubscriptionDrawer subscription={subscription}>
          <button
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Edit subscription"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </AddSubscriptionDrawer> */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              disabled={isDeleting}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors disabled:opacity-50"
              aria-label="Delete subscription"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete subscription?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {subscription.name}? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
