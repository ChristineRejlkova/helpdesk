export enum JobPosition {
  STUDENT,
  TEACHER,
  TECHNICIAN,
  ADMIN,
}

export interface Person {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  jobPosition: JobPosition;
  // studentId?: string;
}
