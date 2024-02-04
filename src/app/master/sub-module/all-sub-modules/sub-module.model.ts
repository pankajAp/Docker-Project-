import {formatDate} from '@angular/common';

export class SubModuleModel {
  smId: number;
  smName: string;
  smModuleId: any;

  constructor(modules) {
    {
      this.smId = modules.smId || this.getRandomID();
      this.smName = modules.smName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
