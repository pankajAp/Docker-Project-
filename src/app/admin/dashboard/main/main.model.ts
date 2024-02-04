import {formatDate} from '@angular/common';

export class MainModel {
  tsId: number;
  timetableId: number;
  timetableName: string;
  tsTimetableId: number;
  tsDayId: number;
  dayName: string;
  tsSubjectId: number;
  subjectName: string;
  tsEmployeeId: number;
  employeeFullname: string;
  tsFromTime: string;
  tsTillTime: string;
  instituteId: number;
  tsIsOnline?: boolean;

  constructor(timetableSchedules) {
    {
      this.tsId = timetableSchedules.tsId || this.getRandomID();
      this.timetableName = timetableSchedules.timetableName || '';
      this.tsTimetableId = timetableSchedules.tsTimetableId || '';
      this.timetableId = timetableSchedules.timetableId || '';
      this.tsDayId = timetableSchedules.tsDayId || '';
      this.dayName = timetableSchedules.dayName || '';
      this.tsSubjectId = timetableSchedules.tsSubjectId || '';
      this.subjectName = timetableSchedules.subjectName || '';
      this.tsEmployeeId = timetableSchedules.tsEmployeeId || '';
      this.employeeFullname = timetableSchedules.employeeFullname || ''; // formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.tsFromTime = formatDate(new Date(), 'H:i:s', 'en') || '';
      this.tsTillTime = formatDate(new Date(), 'H:i:s', 'en') || '';
      this.instituteId = timetableSchedules.instituteId || '';
      this.tsIsOnline = timetableSchedules.tsIsOnline || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
