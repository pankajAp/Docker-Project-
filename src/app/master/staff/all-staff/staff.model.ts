import {formatDate} from '@angular/common';

export class StaffModel {
  staffId: number;
  staffName: string;

  constructor(modules) {
    {
      this.staffId = modules.staffId || this.getRandomID();
      this.staffName = modules.staffName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
