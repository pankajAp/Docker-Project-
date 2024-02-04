export class Org {
  org_id: number;
  org_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.org_id = json.org_id;
      this.org_name = json.org_name;
    }
  }
}
