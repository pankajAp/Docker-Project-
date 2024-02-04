export class UdStatus {
  us_id: number;
  us_ud_id: number;
  us_da_id: number;
  us_user_id: number;
  us_priority_id: number;
  us_classification_id: number;
  us_is_indexed: number;

  constructor(json?: any) {
    if (json != null) {
      this.us_id = json.us_id;
      this.us_ud_id = json.us_ud_id;
      this.us_da_id = json.us_da_id;
      this.us_user_id = json.us_user_id;
      this.us_priority_id = json.us_priority_id;
      this.us_classification_id = json.us_classification_id;
      this.us_is_indexed = json.us_is_indexed;

    }
  }
}
