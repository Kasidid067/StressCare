export interface StudentActivity {
    id: number;
    title: string;
    description: string;
    duration: number;
    category: string;
    image: string | null;
}

export interface StudentDashboard {
    fullname: string;

    latestResult: {
        stressScore: number;
        stressLevel: string;
        createdAt: string;
    } | null;

    history: {
        score: number;
        createdAt: string;
    }[];

    activities: StudentActivity[];
}