
"use client";

import React from "react";
import { useWebsiteMonitoring } from "./website-monitoring-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { AddWebsiteDialog } from "./add-website-dialog";
import { formatDistanceToNow } from "date-fns";
import { Activity, Globe, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

export function UserDashboard() {
  const { websites, deleteWebsite } = useWebsiteMonitoring();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const totalWebsites = websites.length;
  const websitesUp = websites.filter(w => w.status === "UP").length;
  const websitesDown = websites.filter(w => w.status === "DOWN").length;

  const handleDelete = (id: string) => {
    deleteWebsite(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your website uptime
            </p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Add website
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">Total Websites</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">{totalWebsites}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">Monitoring Status</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">Active</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-medium text-gray-500">Websites Up</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">{websitesUp}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-medium text-gray-500">Websites Down</h3>
            </div>
            <p className="mt-2 text-3xl font-bold">{websitesDown}</p>
          </Card>
        </div>

      
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="divide-y">
              {websites.map((website) => (
                <div key={website.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{website.url}</p>
                    <p className="text-sm text-muted-foreground">
                      Last checked {formatDistanceToNow(website.lastChecked, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={website.status} />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(website.id)}
                      aria-label="Delete website"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <AddWebsiteDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}