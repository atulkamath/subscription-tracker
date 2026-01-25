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

export function DownloadReminderButton() {
  const handleDownload = async (daysBefore: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/subscriptions/calendar?remind=${daysBefore}`,
        {
          credentials: "include",
        }
      );

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

      toast.success("Calendar file downloaded successfully!");
    } catch {
      toast.error("Failed to download calendar file");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-xs px-3 py-1.5 border rounded-lg hover:bg-accent transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0">
          <Download className="w-3.5 h-3.5" />
          Download reminder
        </button>
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
