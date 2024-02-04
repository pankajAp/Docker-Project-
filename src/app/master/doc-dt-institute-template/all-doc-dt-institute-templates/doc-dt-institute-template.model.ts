import {formatDate} from '@angular/common';

export class DocDtInstituteTemplateModel {
  dditId: string;
  dditInstituteId: number;
  dditDtId: number;
  dditDaId: number;
  instituteName: string;
  dtName: string;
  daName: string;
  dditDescription: string;
  dditNoOfSteps: string;

  constructor(docDtInstituteTemplateData) {
    {
      this.dditId = docDtInstituteTemplateData.dditId || this.getRandomID();
      this.dditInstituteId = docDtInstituteTemplateData.dditInstituteId || this.getRandomID();
      this.dditDtId = docDtInstituteTemplateData.dditDtId || '';
      this.dditDaId = docDtInstituteTemplateData.dditDaId || '';
      this.instituteName = docDtInstituteTemplateData.instituteName || '';
      this.dtName = docDtInstituteTemplateData.dtName || '';
      this.daName = docDtInstituteTemplateData.daName || '';
      this.dditDescription = docDtInstituteTemplateData.dditDescription || '';
      this.dditNoOfSteps = docDtInstituteTemplateData.dditNoOfSteps || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
