export class Office {
  office_id: number;
  office_name: string;
  office_code: string;
  office_institute_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.office_id = json.office_id;
      this.office_name = json.office_name;
      this.office_code = json.office_code;
      this.office_institute_id = json.office_institute_id;

    }
  }
}
