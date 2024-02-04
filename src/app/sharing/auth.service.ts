import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
// import { OrgInstitute } from './model/org-institute';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwt = new JwtHelperService();

  constructor() {
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return this.jwt.isTokenExpired(token);
  }

  getUser(): Observable<any> {
    const userDetails = localStorage.getItem('userDetails');
    return of(JSON.parse(userDetails));
  }

  // updateUserInstitute(institute: OrgInstitute): Observable<boolean> {
  //   // console.log(institute);
  //   let userDetails = JSON.parse(localStorage.getItem('userDetails'));
  //   userDetails.institute_id = institute.institute_id;
  //   userDetails.institute_name = institute.institute_name;
  //   localStorage.setItem('userDetails', JSON.stringify(userDetails));
  //   return of(true);
  // }
}
