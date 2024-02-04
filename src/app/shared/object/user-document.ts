export class UserDocument {
  document_id: number;
  document_number: string;
  document_srno: number;
  document_subject: string;
  document_previous_ref_no: string;
  document_later_ref_no: string;
  document_content: string;
  document_user_id: number;
  dt_institute_id: number;
  dt_office_id: number;
  dt_folder_id: number;
  dt_file_id: number;
  ud_id: number;
  ud_user_id: number;
  ud_document_id: number;
  ud_nayan: string;

  constructor(json?: any) {
    if (json != null) {
      this.document_id = json.document_id;
      this.document_number = json.document_number;
      this.document_srno = json.document_srno;
      this.document_subject = json.document_subject;
      this.document_previous_ref_no = json.document_previous_ref_no;
      this.document_later_ref_no = json.document_later_ref_no;
      this.document_content = json.document_content;
      this.document_user_id = json.document_user_id;
      this.dt_institute_id = json.dt_institute_id;
      this.dt_office_id = json.dt_office_id;
      this.dt_folder_id = json.dt_folder_id;
      this.dt_file_id = json.dt_file_id;
      this.ud_id = json.ud_id;
      this.ud_user_id = json.ud_user_id;
      this.ud_document_id = json.ud_document_id;
      this.ud_nayan = json.ud_nayan;

    }
  }
}
