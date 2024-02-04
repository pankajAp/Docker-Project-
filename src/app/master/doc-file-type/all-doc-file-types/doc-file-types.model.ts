import {formatDate} from '@angular/common';

export class DocFileTypes {
  dftId: number;
  dftInstituteId: number;
  instituteName: string;
  dftDtId: number;
  dtName: string;
  dftDfId: number;
  dfName: string;
  dfNumber: string;
  correspondenceName: string;
  dftCorrespondenceId: number;

  constructor(docFileType) {
    {
      this.dftId = docFileType.dftId || this.getRandomID();
      this.dftInstituteId = docFileType.dftInstituteId || '';
      this.instituteName = docFileType.instituteName || '';
      this.dftDtId = docFileType.dftDtId || '';
      this.dtName = docFileType.dtName || '';
      this.dftDfId = docFileType.dftDfId || '';
      this.dfName = docFileType.dfName || '';
      this.correspondenceName = docFileType.correspondenceName || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
