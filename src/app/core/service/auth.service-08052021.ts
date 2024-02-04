import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {environment} from 'src/environments/environment';
import {Role} from "../models/role";
import {GlobalFile} from "../../globalfile";

@Injectable({
  providedIn: 'root' //, token
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loginURL = this.globalFile.loginlink + 'login';
  // const headers = new Headers;
  // headers.append('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient, private globalFile: GlobalFile) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userUsername: string, userPassword: string) {
    return this.http
      .post<any>(this.loginURL, {
        userUsername,
        userPassword,
      })
      .pipe(
        map((user) => {
          sessionStorage.setItem("user", JSON.stringify(user));

          // console.log("userDetails => " + user);
          let myUser = new User();
          myUser.id = user.user_id;
          myUser.userUsername = user.user_username;
          myUser.token = 'test';
          myUser.firstName = user.user_fullname;
          // localStorage.setItem('userDetails', JSON.stringify(user));
          myUser.titleName = user.title_name;
          myUser.img = user.user_image;
          myUser.classId = user.sa_class_id;
          myUser.courseId = user.sa_course_id;
          myUser.userEmployeeId = user.user_employee_id;
          myUser.userStudentId = user.user_student_id;
          myUser.userInstituteId = user.user_institute_id;
          if (user.is_software_admin != undefined && user.is_software_admin) {
            myUser.role = Role.Admin;
          } else if (user.user_employee_id != undefined && user.user_employee_id != null) {
            myUser.role = Role.Teacher;
          } else {
            myUser.role = Role.Student;
          }
          // console.log("User Details => ", myUser);
          localStorage.setItem('currentUser', JSON.stringify(myUser));
          localStorage.setItem('token', "123465");
          localStorage.setItem('userDetails', JSON.stringify(myUser));
          this.currentUserSubject.next(myUser);
          return myUser;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    return of({success: false});
  }
}
