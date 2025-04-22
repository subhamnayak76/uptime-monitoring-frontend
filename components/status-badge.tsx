"use client";

import React from "react";
import { WebsiteStatus } from "./website-monitoring-provider";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface StatusBadgeProps {
  status: WebsiteStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "UP" && "bg-green-100 text-green-800",
        status === "DOWN" && "bg-red-100 text-red-800",
        status === "CHECKING" && "bg-blue-100 text-blue-800"
      )}
    >
      {status === "CHECKING" && (
        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
      )}
      {status}
    </div>
  );
}