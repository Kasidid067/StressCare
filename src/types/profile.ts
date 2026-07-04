export interface ProfileData {
  id: number;
  studentId: string;
  fullname: string;
  email: string;
  phone: string | null;
  year: number;
  role: string;
  major: {
    id: number;
    name: string;
  };
}