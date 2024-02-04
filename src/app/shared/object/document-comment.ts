export class DocumentComment {
  dc_id: number;
  dc_document_id: number;
  dc_user_id: number;
  dc_comment: string;

  constructor(json?: any) {
    if (json != null) {
      this.dc_id = json.dc_id;
      this.dc_document_id = json.dc_document_id;
      this.dc_user_id = json.dc_user_id;
      this.dc_comment = json.dc_comment;

    }
  }
}
