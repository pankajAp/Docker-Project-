export class User {
  user_id: number;
  user_title: string;
  user_fullname: string;
  user_email: string;
  user_mobile: string;
  user_username: string;
  user_password: string;
  user_image: string;
  user_role: string;
  user_pancard: string;
  user_dob: Date;
  user_gender: string;
  user_address: string;
  user_office_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.user_id = json.user_id;
      this.user_title = json.user_title;
      this.user_fullname = json.user_fullname;
      this.user_email = json.user_email;
      this.user_mobile = json.user_mobile;
      this.user_username = json.user_username;
      this.user_password = json.user_password;
      this.user_image = json.user_image;
      this.user_role = json.user_role;
      this.user_pancard = json.user_pancard;
      this.user_dob = json.user_dob;
      this.user_gender = json.user_gender;
      this.user_address = json.user_address;
      this.user_office_id = json.user_office_id;

    }
  }
}
