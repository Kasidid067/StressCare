export interface HistoryData {
    id: number;
    assessmentId: number;
    stressScore: number;
    stressLevel: string;
    recommendation: string | null;
    aiSummary: string | null;
    createdAt: string;
}