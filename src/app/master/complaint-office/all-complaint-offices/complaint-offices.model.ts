import {formatDate} from '@angular/common';

export class ComplaintOffice {
  coId: number;
  cbName: string;
  coCbId: number;
  coName: string;
  coCode: string;

  constructor(complaintOffice) {
    {
      this.coId = complaintOffice.coId || this.getRandomID();
      this.coCbId = complaintOffice.coCbId || '';
      this.cbName = complaintOffice.cbName || '';
      this.coName = complaintOffice.coName || '';
      this.coCode = complaintOffice.coCode || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
