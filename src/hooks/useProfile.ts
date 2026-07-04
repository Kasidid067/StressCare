"use client";

import { useEffect, useState } from "react";
import type { ProfileData } from "@/types/profile";
import { getProfile } from "@/services/profile.service";

export function useProfile() {
  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProfile();

      setProfile(data);

      setLoading(false);
    }

    load();
  }, []);

  return {
    profile,
    loading,
    setProfile,
  };
}