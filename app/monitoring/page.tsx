"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { WebsiteMonitoringProvider } from "@/components/website-monitoring-provider";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { useWebsiteMonitoring } from "@/components/website-monitoring-provider";
import { AddWebsiteDialog } from "@/components/add-website-dialog";
import { useState } from "react";

function MonitoringContent() {
  const { websites, loadWebsites, deleteWebsite } = useWebsiteMonitoring();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadWebsites();
    setTimeout(() => setIsRefreshing(false), 500); // Visual feedback
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Monitoring</h1>
          <p className="text-muted-foreground">
            Detailed uptime monitoring for all your websites
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add Website
          </Button>
        </div>
      </div>

      <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Websites Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.filter(site => site.status === "UP").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
              Websites Down
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{websites.filter(site => site.status === "DOWN").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monitored Websites</CardTitle>
          <CardDescription>
            Status and performance of all your monitored websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Website</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Check</th>
                  <th className="text-left py-3 px-4">Notification Email</th>
                  <th className="text-left py-3 px-4">Interval (min)</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {websites.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No websites are being monitored. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  websites.map((website) => (
                    <tr key={website.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{website.url}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={website.status} />
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {website.lastChecked 
                          ? formatDistanceToNow(website.lastChecked, { addSuffix: true })
                          : "Not checked yet"}
                      </td>
                      <td className="py-3 px-4 text-sm">{website.notificationEmail}</td>
                      <td className="py-3 px-4 text-sm">{website.interval}</td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteWebsite(website.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddWebsiteDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}

export default function MonitoringPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true; // Replace with actual auth check
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50">
      <WebsiteMonitoringProvider>
        <MonitoringContent />
      </WebsiteMonitoringProvider>
    </main>
  );
}