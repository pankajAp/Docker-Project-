export class DtContent {
  dc_id: number;
  dc_dt_id: number;
  dc_name: string;
  dc_content: string;

  constructor(json?: any) {
    if (json != null) {
      this.dc_id = json.dc_id;
      this.dc_dt_id = json.dc_dt_id;
      this.dc_name = json.dc_name;
      this.dc_content = json.dc_content;

    }
  }
}
