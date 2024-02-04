export class Appointment {
  appointment_id: number;
  appointment_name: string;
  appointment_starttime: Date;
  appointment_endtime: Date;
  appointment_description: string;
  appointment_location: string;

  constructor(json?: any) {
    if (json != null) {
      this.appointment_id = json.appointment_id;
      this.appointment_name = json.appointment_name;
      this.appointment_starttime = json.appointment_starttime;
      this.appointment_endtime = json.appointment_endtime;
      this.appointment_description = json.appointment_description;
      this.appointment_location = json.appointment_location;

    }
  }
}
