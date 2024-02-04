import {formatDate} from '@angular/common';

export class DoaAmounts {
  dmsId: number;
  dmsName: string;

  constructor(actions) {
    {
      this.dmsId = actions.dmsId || this.getRandomID();
      this.dmsName = actions.dmsName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
