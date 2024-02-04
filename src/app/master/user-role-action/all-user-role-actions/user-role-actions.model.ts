import {formatDate} from '@angular/common';

export class UserRoleActions {

  roleActionId: number;
  userRoleId: number;
  roleName: string;
  userActionId: number;
  actionName: string;
  userFullname: string;
  userId: number;

  // raId: number;
  // roleActionName: string;


  constructor(userRoleActions) {
    {
      this.roleActionId = userRoleActions.roleActionId || this.getRandomID();
      // this.raId = userRoleActions.raId || this.getRandomID();
      // this.roleActionName = userRoleActions.roleActionName || '';
      this.userRoleId = userRoleActions.userRoleId || '';
      this.roleName = userRoleActions.roleName || '';
      this.userActionId = userRoleActions.userActionId || '';
      this.actionName = userRoleActions.actionName || '';
      this.userFullname = userRoleActions.userFullname || '';
      this.userId = userRoleActions.userId || '';
      // this.raActionId = userRoleActions.raActionId || '';
      // this.raRoleId = userRoleActions.raRoleId || '';
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
