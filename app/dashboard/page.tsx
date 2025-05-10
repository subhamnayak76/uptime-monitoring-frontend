"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserDashboard } from "@/components/user-dashboard";
import { WebsiteMonitoringProvider } from "@/components/website-monitoring-provider";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      
      router.push("/login");
    } else {
      
      setIsLoading(false);
    }
  }, [router]);

  
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <WebsiteMonitoringProvider>
        <UserDashboard />
      </WebsiteMonitoringProvider>
    </main>
  );
}