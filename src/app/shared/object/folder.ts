export class Folder {
  folder_id: number;
  folder_name: string;
  folder_code: string;
  folder_office_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.folder_id = json.folder_id;
      this.folder_name = json.folder_name;
      this.folder_code = json.folder_code;
      this.folder_office_id = json.folder_office_id;

    }
  }
}
