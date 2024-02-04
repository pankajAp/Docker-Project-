import {formatDate} from '@angular/common';

export class StudentDocuments {
  sdId: number;
  sdName: string;

  constructor(studentDocuments) {
    {
      this.sdId = studentDocuments.sdId || this.getRandomID();
      this.sdName = studentDocuments.sdName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
