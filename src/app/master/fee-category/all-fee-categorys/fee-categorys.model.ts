import {formatDate} from '@angular/common';

export class FeeCategories {
  fcId: number;
  fcCategoryName: string;
  fcCategoryInstituteId: number;

  constructor(studentDocuments) {
    {
      this.fcId = studentDocuments.fcId || this.getRandomID();
      this.fcCategoryName = studentDocuments.fcCategoryName || '';
      this.fcCategoryInstituteId = studentDocuments.fcCategoryInstituteId;
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
