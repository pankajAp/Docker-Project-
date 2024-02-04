import {Role} from './role';

export class User {
  id: number;
  code: string;
  img: string;
  userUsername: string;
  userPassword: string;
  firstName: string;
  titleName: string;
  lastName: string;
  role: Role;
  token?: string;
  classId?: number;
  courseId?: number;
  userEmployeeId?: number;
  userStudentId?: number;
  userInstituteId?: number;
  userOfficeId?: number;
  instituteName?: string;
  userAccessMultipleColleges?: boolean;
  roleName?: string;
  positionName?: string;
  employeeMobile?: string;
  status?: boolean;
}
