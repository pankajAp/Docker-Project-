export class Priority {
  priority_id: number;
  priority_name: string;
  priority_seq: number;

  constructor(json?: any) {
    if (json != null) {
      this.priority_id = json.priority_id;
      this.priority_name = json.priority_name;
      this.priority_seq = json.priority_seq;

    }
  }
}
