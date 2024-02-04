export class NotificationType {
  nt_id: number;
  nt_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.nt_id = json.nt_id;
      this.nt_name = json.nt_name;

    }
  }
}
