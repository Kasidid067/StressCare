"use client";

import { useEffect, useState } from "react";
import { getAssessment } from "@/services/assessment.service";
import type { AssessmentData } from "@/types/assessment";

export function useAssessment(id: number) {
  const [assessment, setAssessment] =
    useState<AssessmentData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAssessment(id);

      setAssessment(data);

      setLoading(false);
    }

    if (id) {
      load();
    }
  }, [id]);

  return {
    assessment,
    loading,
  };
}