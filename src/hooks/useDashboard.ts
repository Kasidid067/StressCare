"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard.service";
import type { DashboardData } from "@/types/dashboard";

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    dashboard,
    loading,
  };
}