import {Injectable} from '@angular/core';

export interface UserInStorage {
  user_id: number;
  full_name: string;
  role: string;
  org_id: number;
  token: string;
  created_at: Date;
  user_office_id: number;
  user_institute_id: number;
  office_name: string;
}

export interface LoginInfoInStorage {
  success: boolean;
  message: string;
  landingPage: string;
  user?: UserInStorage;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public currentUserKey: string = 'currentUser';
  public storage: Storage = localStorage; //  <--- you may switch between sessionStorage or LocalStrage (only one place to change)
  constructor() {
  }

  // Store userinfo from session storage
  storeUserInfo(userInfoString: string) {
    this.storage.setItem(this.currentUserKey, userInfoString);
    // console.log(this.storage);
  }

  // Remove userinfo from session storage
  removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
    sessionStorage.clear();
    localStorage.clear();
  }

  // Get userinfo from session storage
  getUserInfo(): UserInStorage | null {
    try {
      const userInfoString: string = this.storage.getItem(this.currentUserKey);
      if (userInfoString) {
        const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
        return userObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.storage.getItem(this.currentUserKey) ? true : false;
  }

  // Get User's Display name from session storage
  getUserName(): string {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.full_name;
    }
    return 'no-user';
  }

  // getUserEmail(): string {
  //     const userObj: UserInStorage = this.getUserInfo();
  //     if (userObj !== null) {
  //         return userObj.email;
  //     }
  //     return 'no-email';
  // }
  getUserRole(): string {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.role;
    }
    return 'no-role';
  }

  getUserId(): number {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.user_id;
    }
    return null;
  }

  getOrgId(): number {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.org_id;
    }
    return 1;
  }

  getStoredToken(): string | null {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.token;
    }
    return null;
  }
}
