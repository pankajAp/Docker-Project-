import {formatDate} from '@angular/common';

export class StudentDocumentFeeCategorysModel {
  sdfcId: number;
  // roleActionName: string;
  fcId: number;
  fcCategoryName: string;

  constructor(studentDocumentFeeCategories) {
    {
      this.sdfcId = studentDocumentFeeCategories.sdfcId || this.getRandomID();
      this.fcId = studentDocumentFeeCategories.fcId
      this.fcCategoryName = studentDocumentFeeCategories.fcCategoryName || ''
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
