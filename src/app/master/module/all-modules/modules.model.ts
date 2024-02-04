import {formatDate} from '@angular/common';

export class Modules {
  moduleId: number;
  moduleName: string;

  constructor(modules) {
    {
      this.moduleId = modules.moduleId || this.getRandomID();
      this.moduleName = modules.moduleName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
