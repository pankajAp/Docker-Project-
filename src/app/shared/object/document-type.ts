export class DocumentType {
  dt_id: number;
  dt_correspondence_id: number;
  dt_institute_id: number;
  dt_office_id: number;
  dt_folder_id: number;
  dt_file_id: number;
  dt_name: string;
  dt_content: string;

  constructor(json?: any) {
    if (json != null) {
      this.dt_id = json.dt_id;
      this.dt_correspondence_id = json.dt_correspondence_id;
      this.dt_institute_id = json.dt_institute_id;
      this.dt_office_id = json.dt_office_id;
      this.dt_folder_id = json.dt_folder_id;
      this.dt_file_id = json.dt_file_id;
      this.dt_name = json.dt_name;
      this.dt_content = json.dt_content;

    }
  }
}
