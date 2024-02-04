import {formatDate} from '@angular/common';

export class ComplaintBuilding {
  cbId: number;
  cbName: string;
  cbCode: string;

  constructor(actions) {
    {
      this.cbId = actions.cbId || this.getRandomID();
      this.cbName = actions.cbName || '';
      this.cbCode = actions.cbCode || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
