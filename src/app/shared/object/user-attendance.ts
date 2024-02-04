export class UserAttendance {
  ua_id: number;
  ua_user_id: number;
  ua_latitude: number;
  ua_longitude: number;
  ua_altitude: number;
  ua_accuracy: number;
  ua_altitude_accuracy: number;
  ua_photo: string;
  ua_for: string;

  constructor(json?: any) {
    if (json != null) {
      this.ua_id = json.ua_id;
      this.ua_user_id = json.ua_user_id;
      this.ua_latitude = json.ua_latitude;
      this.ua_longitude = json.ua_longitude;
      this.ua_altitude = json.ua_altitude;
      this.ua_accuracy = json.ua_accuracy;
      this.ua_altitude_accuracy = json.ua_altitude_accuracy;
      this.ua_photo = json.ua_photo;
      this.ua_for = json.ua_for;

    }
  }
}
