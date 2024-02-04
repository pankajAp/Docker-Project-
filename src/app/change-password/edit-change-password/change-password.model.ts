import {formatDate} from '@angular/common';

export class ChangePassword {
  userPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor(changePassword) {
    {
      this.userPassword = changePassword.userPassword;
      this.newPassword = changePassword.newPassword || '';
      this.confirmPassword = changePassword.confirmPassword || '';
    }
  }

  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
