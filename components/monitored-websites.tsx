"use client";

import React from "react";
import { useWebsiteMonitoring } from "./website-monitoring-provider";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { AddWebsiteDialog } from "./add-website-dialog";
import { formatDistanceToNow } from "date-fns";

export function MonitoredWebsites() {
  const { websites, deleteWebsite } = useWebsiteMonitoring();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Monitored Websites</h2>
        <p className="text-muted-foreground mb-4">
          A list of all the websites being monitored, their current status, and when they were last checked.
        </p>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Add website
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Site</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {websites.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-muted-foreground">
                    No websites are being monitored. Add one to get started.
                  </td>
                </tr>
              ) : (
                websites.map((website) => (
                  <tr key={website.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="font-medium">{website.url}</div>
                        <div className="text-sm text-muted-foreground">
                          Last checked {formatDistanceToNow(website.lastChecked, { addSuffix: true })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <StatusBadge status={website.status} />
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteWebsite(website.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <AddWebsiteDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
}