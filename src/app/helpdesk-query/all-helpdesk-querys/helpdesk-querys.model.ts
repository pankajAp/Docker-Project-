import { formatDate } from '@angular/common';
export class HelpdeskQuerysModel {
  hqId: number;
  hqDescription: string;
  hqNo: string;
  hqDatetime: string;
  hqModuleId: number;
  hqUserId: number;
  smName: string;
  moduleName: string;
  instituteId: number;
  userId: number;
  hqAttachment: string;
  hqInstituteId: number;
  hqSmId: number;
  hqUserMobile: string;
  hqAssignDatetime: string;
  hqTypeOfQuery: string;
  hqRemark: string;
  hqAssignTo: string;
  hqCloseDatetime: string;
  hqAssigneeStatus: string;
  hqAssigneeRemark: string;
  hqClosureDatetime: string;
  hqClosureStatus: string;
  hqClosureRemark: string;
  hqAssignBy: string;
  hqResolvedBy: string;
  hqClosureBy: string;
  userFullname: string;

  constructor(mstHelpdeskQuery) {
    {
      this.hqId = mstHelpdeskQuery.hqId || this.getRandomID();
      this.hqDescription = mstHelpdeskQuery.hqDescription || '';
      this.hqNo = mstHelpdeskQuery.hqNo || '';
      this.moduleName = mstHelpdeskQuery.moduleName || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
