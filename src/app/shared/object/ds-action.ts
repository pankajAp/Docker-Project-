export class DsAction {
  da_id: number;
  da_name: string;
  da_ds_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.da_id = json.da_id;
      this.da_name = json.da_name;
      this.da_ds_id = json.da_ds_id;

    }
  }
}
