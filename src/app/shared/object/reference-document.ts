export class ReferenceDocument {
  rd_id: number;
  rd_document_id: string;
  rd_user_id: number;
  rd_office_id: number;
  rd_folder_id: number;
  rd_file_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.rd_id = json.rd_id;
      this.rd_document_id = json.rd_document_id;
      this.rd_user_id = json.rd_user_id;
      this.rd_office_id = json.rd_office_id;
      this.rd_folder_id = json.rd_folder_id;
      this.rd_file_id = json.rd_file_id;
    }
  }
}
