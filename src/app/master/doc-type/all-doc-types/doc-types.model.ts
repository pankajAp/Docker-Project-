import {formatDate} from '@angular/common';

export class DocTypesModel {
  dtId: number;
  dtName: string;
  dtPrefix: string;
  correspondenceName: any;
  dtSrNo: any;

  constructor(docTypesModel) {
    {
      this.dtId = docTypesModel.dtId || this.getRandomID();
      this.dtName = docTypesModel.dtName || '';
      this.dtPrefix = docTypesModel.dtPrefix || '';
      this.correspondenceName = docTypesModel.correspondenceName || '';
      this.dtSrNo = docTypesModel.dtSrNo || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
