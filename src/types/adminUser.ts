export interface AdminUser {
    id: number;

    studentId: string;
    fullname: string;
    email: string;
    phone: string | null;

    year: number;

    role: string;
    status: string;

    // เพิ่มสองบรรทัดนี้
    majorId: number;
    advisorId: number | null;

    major: {
        id: number;
        name: string;
    };

    advisor: {
        id: number;
        fullname: string;
    } | null;
}