export class Institute {
  institute_id: number;
  institute_name: string;
  institute_header_name: string;
  institute_code: string;
  institute_logo: string;
  institute_address: string;
  institute_phone: string;
  institute_email: string;
  institute_website: string;
  institute_about: string;
  institute_contact_us: string;
  institute_org_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.institute_id = json.institute_id;
      this.institute_name = json.institute_name;
      this.institute_header_name = json.institute_header_name;
      this.institute_code = json.institute_code;
      this.institute_logo = json.institute_logo;
      this.institute_address = json.institute_address;
      this.institute_phone = json.institute_phone;
      this.institute_email = json.institute_email;
      this.institute_website = json.institute_website;
      this.institute_about = json.institute_about;
      this.institute_contact_us = json.institute_contact_us;
      this.institute_org_id = json.institute_org_id;

    }
  }
}
