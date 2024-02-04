export class DocumentStatus {
  ds_id: number;
  ds_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.ds_id = json.ds_id;
      this.ds_name = json.ds_name;

    }
  }
}
