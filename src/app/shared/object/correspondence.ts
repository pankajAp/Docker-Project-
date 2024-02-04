export class Correspondence {
  correspondence_id: number;
  correspondence_name: number;

  constructor(json?: any) {
    if (json != null) {
      this.correspondence_id = json.correspondence_id;
      this.correspondence_name = json.correspondence_name;

    }
  }
}
