import {formatDate} from '@angular/common';

export class DoaAmounts {
  daId: number;
  daName: string;

  constructor(actions) {
    {
      this.daId = actions.daId || this.getRandomID();
      this.daName = actions.daName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
