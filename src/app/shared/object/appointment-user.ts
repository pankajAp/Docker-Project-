export class AppointmentUser {
  au_id: number;
  au_appointment_id: number;
  au_user_id: number;
  au_who: string;

  constructor(json?: any) {
    if (json != null) {
      this.au_id = json.au_id;
      this.au_appointment_id = json.au_appointment_id;
      this.au_user_id = json.au_user_id;
      this.au_who = json.au_who;

    }
  }
}
