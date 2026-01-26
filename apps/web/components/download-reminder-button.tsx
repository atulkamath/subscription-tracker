"use client";

import { Download } from "lucide-react";
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
import { toast } from "sonner";
import { Subscription } from "@/lib/types";
import { Button } from "./ui/button";

export function DownloadReminderButton({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  const willReminderBePast = (renewalDay: number, daysBefore: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const event = new Date(today.getFullYear(), today.getMonth(), renewalDay);

    if (event <= today) {
      event.setMonth(event.getMonth() + 1);
    }

    const reminder = new Date(event);
    reminder.setDate(reminder.getDate() - daysBefore);

    return reminder <= today;
  };

  const handleDownload = async (daysBefore: number) => {
    try {
      const response = await fetch(`/api/calendar?remind=${daysBefore}`);

      if (!response.ok) {
        throw new Error("Failed to download calendar");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscription-reminders.ics";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      const adjustedCount = subscriptions.filter((s) =>
        willReminderBePast(s.renewalDay, daysBefore),
      ).length;

      if (adjustedCount > 0) {
        toast.success(
          `Calendar downloaded. ${adjustedCount} reminder(s) were adjusted because the selected reminder time had already passed.`,
        );
      } else {
        toast.success("Calendar file downloaded successfully!");
      }
    } catch {
      toast.error("Failed to download calendar file");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} disabled={subscriptions.length === 0}>
          <Download className="w-3.5 h-3.5" />
          Download reminder
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download Calendar Reminders</AlertDialogTitle>
          <AlertDialogDescription>
            When would you like to be reminded about your subscription renewals?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-2 gap-3 py-4">
          {[
            { value: 0, label: "Same day" },
            { value: 1, label: "1 day before" },
            { value: 2, label: "2 days before" },
            { value: 7, label: "7 days before" },
          ].map((option) => (
            <AlertDialogAction
              key={option.value}
              onClick={() => handleDownload(option.value)}
              className="p-3 rounded-lg border-2 text-sm font-medium transition-colors border-input hover:bg-accent bg-background text-foreground hover:text-accent-foreground"
            >
              {option.label}
            </AlertDialogAction>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
