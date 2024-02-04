import {Injectable} from "@angular/core";

Injectable()

export class GlobalFile {
  // globallink = 'http://localhost:8091/mims-admin-service/';
  // loginlink = 'http://localhost:8091/';
  // base_path = 'http://localhost:8091/mims-admin-service/';
  // application_path = 'http://localhost:8080/';

  // globallink = 'https://smbtecampus.org:8445/elms_live_ws/';
  // loginlink = 'https://smbtecampus.org:8445/elms_live_ws/';
  // base_path = 'https://smbtecampus.org:8445/elms_live_ws/';
  // application_path = 'https://smbtecampus.org:8445/';

  globallink = 'https://smbtecampus.org:8445/elms_beta_ws/';
  loginlink = 'https://smbtecampus.org:8445/elms_beta_ws/';
  base_path = 'https://smbtecampus.org:8445/elms_beta_ws/';
  application_path = 'https://smbtecampus.org:8445/';

  // globallink = 'https://smbtecampus.org:8445/elms_beta_ws/';
  // loginlink = 'https://smbtecampus.org:8445/elms_beta_ws/';
  // base_path = 'https://smbtecampus.org:8445/elms_beta_ws/';
  // application_path = 'https://smbtecampus.org:8445/';

  // globallink = 'https://cellbeans.in:8443/mims_new_ws/';
  // loginlink = 'https://cellbeans.in:8443/mims_new_ws/';
  // base_path = 'https://cellbeans.in:8443/mims_new_ws/';
  // application_path = 'https://cellbeans.in:8443/';

  public localStorageItem(id: string): string {
    console.log("function called");
    return localStorage.getItem('userDetails');
    return localStorage.getItem('userAction');
  }

  public sessionStorageItem(): string {
    console.log("sessionStorageItem called");
    return localStorage.getItem('userAction');
  }
}
