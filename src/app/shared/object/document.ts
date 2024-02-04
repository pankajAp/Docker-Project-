export class Document {
  document_id: number;
  document_number: string;
  document_srno: number;
  document_subject: string;
  document_previous_ref_no: string;
  document_later_ref_no: string;
  document_content: string;
  document_user_id: number;
  user_fullname: string;
  dt_institute_id: number;
  dt_office_id: number;
  dt_folder_id: number;
  dt_file_id: number;
  document_max_no: number;
  document_number_string: string;
  folder_name: string;
  file_name: string;
  office_name: string;
  document_is_saved: boolean;

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
      this.user_fullname = json.user_fullname;
      this.dt_institute_id = json.dt_institute_id;
      this.dt_office_id = json.dt_office_id;
      this.dt_folder_id = json.dt_folder_id;
      this.dt_file_id = json.dt_file_id;
      this.folder_name = json.folder_name;
      this.file_name = json.file_name;
      this.document_is_saved = json.document_is_saved;
    }
  }
}
