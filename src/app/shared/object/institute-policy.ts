export class InstitutePolicy {
  ip_id: number;
  ip_name: string;
  ip_description: string;
  ip_institute_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.ip_id = json.ip_id;
      this.ip_name = json.ip_name;
      this.ip_description = json.ip_description;
      this.ip_institute_id = json.ip_institute_id;

    }
  }
}
