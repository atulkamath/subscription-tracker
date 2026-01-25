"use client";

import { Header } from "./header";
import { CurrencyProvider } from "@/contexts/currency-context";
import type { Subscription } from "@/lib/types";
import { HeroSection } from "./hero-section";

interface ClientLayoutProps {
  totalMonthly: number;
  subscriptionCount: number;
  subscriptions: Subscription[];
  children: React.ReactNode;
}

export function ClientLayout({
  totalMonthly,
  subscriptionCount,
  children,
}: ClientLayoutProps) {
  return (
    <CurrencyProvider>
      <div className="min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-6">
          <HeroSection
            totalMonthly={totalMonthly}
            subscriptionCount={subscriptionCount}
          />

          {children}
        </main>
      </div>
    </CurrencyProvider>
  );
}
