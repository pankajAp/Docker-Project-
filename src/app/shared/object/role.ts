export class Role {
  role_id: number;
  role_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.role_id = json.role_id;
      this.role_name = json.role_name;

    }
  }
}
