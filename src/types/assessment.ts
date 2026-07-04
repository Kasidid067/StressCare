export interface AssessmentData {
  id: number;
  totalScore: number;
  createdAt: string;

  result: {
    stressScore: number;
    stressLevel: string;
    recommendation: string | null;
    aiSummary: string | null;
  };

  answers: {
    questionNo: number;
    score: number;
  }[];
}