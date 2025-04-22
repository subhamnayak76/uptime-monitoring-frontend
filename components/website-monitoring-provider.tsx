"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { monitorsApi } from "@/lib/api";

export type WebsiteStatus = "UP" | "DOWN" | "CHECKING";

export interface MonitoredWebsite {
  id: string;
  url: string;
  status: WebsiteStatus;
  lastChecked: Date;
  notificationEmail: string;
  interval: number;
}

interface WebsiteMonitoringContextType {
  websites: MonitoredWebsite[];
  addWebsite: (url: string, notificationEmail: string, interval: number) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
  checkWebsite: (id: string) => void;
  checkAllWebsites: () => void;
  emailNotifications: boolean;
  setEmailNotifications: (enabled: boolean) => void;
}

const WebsiteMonitoringContext = createContext<WebsiteMonitoringContextType | undefined>(undefined);

export function WebsiteMonitoringProvider({ children }: { children: React.ReactNode }) {
  const [websites, setWebsites] = useState<MonitoredWebsite[]>([]);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const { toast } = useToast();
  console.log("form web",websites)
  useEffect(() => {
    loadWebsites();
  }, []);

  useEffect(() => {
    console.log("Websites state updated:", websites);
  }, [websites]); 


  // const loadWebsites = async () => {
  //   try {
  //     const data = await monitorsApi.getAll();
  //     console.log(data)
      
  //     setWebsites(data.map((monitor: any) => ({
  //       id: monitor.id,
  //       url: monitor.url,
  //       status: monitor.pingResults[0].isUp ? "UP" : "DOWN",
  //       lastChecked: new Date(monitor.lastPingedAt),
  //       notificationEmail: monitor.notificationEmail,
  //       interval: monitor.interval
  //     })));
      
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to load monitors",
  //       variant: "destructive",
  //     });
  //   }
  // };


  const loadWebsites = async () => {
    try {
      const data = await monitorsApi.getAll();
      console.log("Data from API:", data); 

      if (Array.isArray(data)) { // Ensure data is an array
        const mappedData = data.map((monitor: any) => ({
          id: monitor.id,
          url: monitor.url,
          
          status: (monitor.pingResults && monitor.pingResults.length > 0 
                    ? (monitor.pingResults[0].isUp ? "UP" : "DOWN") 
                    : "CHECKING") as WebsiteStatus,
          lastChecked: new Date(monitor.lastPingedAt),
          notificationEmail: monitor.notificationEmail,
          interval: monitor.interval
        }));
        console.log("Mapped data for state:", mappedData); 
        setWebsites(mappedData);
      } else {
         console.error("API did not return an array:", data);
         setWebsites([]); 
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load monitors",
        variant: "destructive",
      });
      console.error("Error loading websites:", error); 
      setWebsites([]); 
    }
  };

  const addWebsite = async (url: string, notificationEmail: string, interval: number) => {
    try {
      const a = await monitorsApi.create({ url, notificationEmail, interval });
      await loadWebsites();
      
      toast({
        title: "Success",
        description: "Website monitor added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add website monitor",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteWebsite = async (id: string) => {
    try {
      await monitorsApi.delete(id);
      setWebsites(prev => prev.filter(website => website.id !== id));
      toast({
        title: "Success",
        description: "Website monitor deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete website monitor",
        variant: "destructive",
      });
      throw error;
    }
  };

  const checkWebsite = async (id: string) => {
    setWebsites(prev => 
      prev.map(website => {
        if (website.id === id) {
          return { ...website, status: "CHECKING" };
        }
        return website;
      })
    );

    try {
      const monitor = await monitorsApi.getById(id);
      setWebsites(prev => 
        prev.map(website => {
          if (website.id === id) {
            return {
              ...website,
              status: monitor.lastPingResult?.isUp ? "UP" : "DOWN",
              lastChecked: new Date(monitor.lastPingedAt)
            };
          }
          return website;
        })
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check website status",
        variant: "destructive",
      });
    }
  };

  const checkAllWebsites = () => {
    websites.forEach(website => checkWebsite(website.id));
  };

  return (
    <WebsiteMonitoringContext.Provider
      value={{
        websites,
        addWebsite,
        deleteWebsite,
        checkWebsite,
        checkAllWebsites,
        emailNotifications,
        setEmailNotifications
      }}
    >
      {children}
    </WebsiteMonitoringContext.Provider>
  );
}

export function useWebsiteMonitoring() {
  const context = useContext(WebsiteMonitoringContext);
  if (context === undefined) {
    throw new Error("useWebsiteMonitoring must be used within a WebsiteMonitoringProvider");
  }
  return context;
}