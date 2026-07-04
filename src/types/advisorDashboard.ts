export interface AdvisorDashboardStudent {
    id: number;
    studentId: string;
    fullname: string;
    major: string;
    latestResult: {
        score: number;
        level: string;
        createdAt: string;
    } | null;
}

export interface AdvisorDashboard {
    totalStudents: number;
    lowStress: number;
    mediumStress: number;
    highStress: number;
    students: AdvisorDashboardStudent[];
}