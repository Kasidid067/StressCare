"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/services/adminUserDetail.service";
import type { AdminUser } from "@/types/adminUser";

export function useAdminUser(id: number) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getUser(id);
      setUser(data);
      setLoading(false);
    }

    if (id) {
      load();
    }
  }, [id]);

  return {
    user,
    loading,
  };
}