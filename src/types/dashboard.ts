export interface DashboardData {
  fullname: string;
  studentId: string;
  major: string;
  year: number;
  role: string;

  latestStress: {
    stressScore: number;
    stressLevel: string;
  } | null;

  latestPulse: {
    bpm: number;
    spo2: number | null;
  } | null;
}