export class Department {
  department_id: number;
  department_name: string;
  department_org_id: number;
  org_id: number;
  org_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.department_id = json.department_id;
      this.department_name = json.department_name;
      this.department_org_id = json.department_org_id;
      this.org_id = json.org_id;
      this.org_name = json.org_name;

    }
  }
}
