export class DocumentEnclosure {
  de_id: number;
  de_name: string;
  de_document_id: number;
  de_file: string;

  constructor(json?: any) {
    if (json != null) {
      this.de_id = json.de_id;
      this.de_name = json.de_name;
      this.de_document_id = json.de_document_id;
      this.de_file = json.de_file;

    }
  }
}
