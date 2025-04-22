"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWebsiteMonitoring } from "./website-monitoring-provider";

interface AddWebsiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWebsiteDialog({ open, onOpenChange }: AddWebsiteDialogProps) {
  const [url, setUrl] = useState("");
  const [notificationEmail,setNotificationEmail] = useState("")
  const [interval,setInterval] = useState(5)
  const [error, setError] = useState("");
  const { addWebsite } = useWebsiteMonitoring();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!url.trim()) {
      setError("URL is required");
      return;
    }

    
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+|localhost)(:\d+)?(\/\S*)?$/;
    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    
    addWebsite(url,notificationEmail,interval);
    
    
    setUrl("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add website to monitor</DialogTitle>
            <DialogDescription>
              Enter the URL of the website you want to monitor for uptime.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                className={error ? "border-red-500" : ""}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input
                id="notificationEmail"
                type="email"
                placeholder="your@email.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interval">Check Interval (minutes)</Label>
              <Input
                id="interval"
                type="number"
                min="1"
                max="60"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setUrl("");
                setError("");
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add website</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}