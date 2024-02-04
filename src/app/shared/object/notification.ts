export class Notification {
  notification_id: number;
  notification_description: string;
  notification_nt_id: number;
  notification_document_id: number;
  notification_from_user_id: number;
  notification_to_user_id: number;
  notification_is_read: boolean;

  constructor(json?: any) {
    if (json != null) {
      this.notification_id = json.notification_id;
      this.notification_description = json.notification_description;
      this.notification_nt_id = json.notification_nt_id;
      this.notification_document_id = json.notification_document_id;
      this.notification_from_user_id = json.notification_from_user_id;
      this.notification_to_user_id = json.notification_to_user_id;
      this.notification_is_read = json.notification_is_read;

    }
  }
}
