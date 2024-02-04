export class File {
  file_id: number;
  file_name: string;
  file_code: string;
  file_folder_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.file_id = json.file_id;
      this.file_name = json.file_name;
      this.file_code = json.file_code;
      this.file_folder_id = json.file_folder_id;

    }
  }
}
