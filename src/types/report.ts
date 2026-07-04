export interface Report {
    id: number;
    createdAt: string;
    stressScore: number;
    stressLevel: string;
    user: {
        studentId: string;
        fullname: string;
        major: {
            name: string;
        };
    };
}