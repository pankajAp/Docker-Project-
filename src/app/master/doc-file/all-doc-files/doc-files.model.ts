import {formatDate} from '@angular/common';

export class DocFilesModel {
  dfId: number;
  dfNo: string;
  correspondenceName: any;
  instituteName: any;
  dfSrNo: any;

  constructor(docFilesModel) {
    {
      this.dfId = docFilesModel.dfId || this.getRandomID();
      this.dfNo = docFilesModel.dfNo || '';
      this.correspondenceName = docFilesModel.correspondenceName || '';
      this.instituteName = docFilesModel.instituteName || '';
      this.dfSrNo = docFilesModel.dfSrNo || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
