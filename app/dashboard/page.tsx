"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserDashboard } from "@/components/user-dashboard";
import { WebsiteMonitoringProvider } from "@/components/website-monitoring-provider";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true; 
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <WebsiteMonitoringProvider>
        <UserDashboard />
      </WebsiteMonitoringProvider>
    </main>
  );
}