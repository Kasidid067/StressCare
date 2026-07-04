export interface StaffStudent {

    id: number;

    studentId: string;

    fullname: string;

    year: number;

    major: {
        id: number;
        name: string;
    };

    advisor: {
        id: number;
        fullname: string;
    } | null;

    results: {

        id: number;

        stressScore: number;

        stressLevel: string;

    }[];

}