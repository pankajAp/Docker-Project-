import {formatDate} from '@angular/common';

export class Roles {
  roleId: number;
  roleName: string;
  // batchName: string;
  // className: string;
  // courseName: string;
  // timetableBatchId: number;
  // timetableCourseId: number;
  // timetableClassId: number;
  // timetableFrom: string;
  // timetableTill: string;
  // timetable_from_date: string;
  // timetable_till_date: string;
  // timetableRemark: string;
  // instituteId: number;

  constructor(roles) {
    {
      this.roleId = roles.roleId || this.getRandomID();
      this.roleName = roles.roleName || '';
      // this.batchName = timetables.batchName || '';
      // this.timetableBatchId = timetables.timetableBatchId || '';
      // this.courseName = timetables.courseName || '';
      // this.timetableCourseId = timetables.timetableCourseId || '';
      // this.timetableFrom = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      // this.timetableTill = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      // this.className = timetables.className || '';
      // this.timetableClassId = timetables.timetableClassId || '';
      // this.timetableRemark = timetables.timetableRemark || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
