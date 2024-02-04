export class Classification {
  classification_id: number;
  classification_name: string;

  constructor(json?: any) {
    if (json != null) {
      this.classification_id = json.classification_id;
      this.classification_name = json.classification_name;

    }
  }
}
