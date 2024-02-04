export class InstituteSop {
  is_id: number;
  is_name: string;
  is_procedure: string;

  constructor(json?: any) {
    if (json != null) {
      this.is_id = json.is_id;
      this.is_name = json.is_name;
      this.is_procedure = json.is_procedure;

    }
  }
}
