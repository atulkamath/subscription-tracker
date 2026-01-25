"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Film,
  Dumbbell,
  ShoppingBag,
  Cloud,
  Laptop,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCurrency } from "@/contexts/currency-context";
import { format } from "date-fns";
import type { Subscription } from "@/lib/types";
import useIsMobile from "@/utils/useIsMobile";

const CATEGORIES: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: "entertainment", label: "Entertainment", icon: Film },
  { value: "gym", label: "Gym", icon: Dumbbell },
  { value: "shopping", label: "Shopping", icon: ShoppingBag },
  { value: "cloud", label: "Cloud Storage", icon: Cloud },
  { value: "software", label: "Software", icon: Laptop },
  { value: "generic", label: "Other", icon: FileText },
];

interface AddSubscriptionDrawerProps {
  children: React.ReactNode;
  subscription?: Subscription;
}

export function AddSubscriptionDrawer({
  children,
  subscription,
}: AddSubscriptionDrawerProps) {
  const isEditMode = !!subscription;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    renewalDay: "",
    iconKey: "generic",
  });
  const { currency, getCurrencySymbol } = useCurrency();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (open) {
      if (isEditMode && subscription) {
        setFormData({
          name: subscription.name,
          price: subscription.price.toString(),
          renewalDay: subscription.renewalDay.toString(),
          iconKey: subscription.iconKey,
        });
        const today = new Date();
        setDate(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            subscription.renewalDay,
          ),
        );
      } else {
        setFormData({
          name: "",
          price: "",
          renewalDay: "",
          iconKey: "generic",
        });
        setDate(undefined);
      }
      setError(null);
    }
  }, [open, isEditMode, subscription]);

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.price !== "" &&
      parseFloat(formData.price) >= 0.01 &&
      formData.renewalDay !== "" &&
      parseInt(formData.renewalDay) >= 1 &&
      parseInt(formData.renewalDay) <= 31
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditMode
        ? `/api/subscriptions/${subscription!.id}`
        : `/api/subscriptions`;

      const response = await fetch(url, {
        method: isEditMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          renewalDay: parseInt(formData.renewalDay),
          iconKey: formData.iconKey,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditMode ? "update" : "create"} subscription`,
        );
      }

      toast.success(
        isEditMode
          ? "Subscription updated successfully!"
          : "Subscription added successfully!",
      );
      setOpen(false);
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to ${isEditMode ? "update" : "create"} subscription`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        <DrawerHeader>
          <DrawerTitle>
            {isEditMode ? "Edit Subscription" : "Add New Subscription"}
          </DrawerTitle>
          <DrawerDescription>
            {isEditMode
              ? "Update your subscription details"
              : "Add a subscription to track your monthly spending"}
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="px-4 pb-4">
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Netflix"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">
                Price ({getCurrencySymbol(currency)})
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {getCurrencySymbol(currency)}
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  className="pl-12"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Renewal Day */}
            <div className="space-y-2">
              <Label>Renewal Day</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    disabled={(date) => date < new Date()}
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      if (newDate) {
                        setDate(newDate);
                        const day = newDate.getDate();
                        setFormData({
                          ...formData,
                          renewalDay: day.toString(),
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {formData.renewalDay && (
                <p className="text-xs text-muted-foreground">
                  Renews on day {formData.renewalDay} of each month
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, iconKey: category.value })
                      }
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                        formData.iconKey === category.value
                          ? "border-primary bg-primary/10"
                          : "border-input hover:bg-accent"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs font-medium">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <DrawerFooter className="px-0">
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Subscription"
                  : "Add Subscription"}
            </button>
            <DrawerClose asChild>
              <button
                type="button"
                disabled={isSubmitting}
                className="w-full border border-input bg-background hover:bg-accent h-10 px-4 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
