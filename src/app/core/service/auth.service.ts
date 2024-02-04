import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {environment} from 'src/environments/environment';
import {Role} from "../models/role";
import {GlobalFile} from "../../globalfile";

@Injectable({
  providedIn: 'root'//, token
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loginURL = this.globalFile.loginlink + 'login';
  private loginURLById = this.globalFile.loginlink + 'loginByUserId';
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
          // console.log(user)
          if (user == null) {
            let myUser = new User();
            myUser.code = "200";
            return myUser;
          } else {
            sessionStorage.setItem("user", JSON.stringify(user));
            let myUser = new User();
            myUser.id = user.user_id;
            myUser.userUsername = user.user_username;
            myUser.token = 'test';
            myUser.firstName = user.user_fullname;
            // localStorage.setItem('userDetails', JSON.stringify(user));
            myUser.titleName = user.title_name;
            myUser.img = user.user_image;
            if (user.sa_class_id != null) {
              myUser.classId = user.sa_class_id;
            } else {
              myUser.classId = 0;
            }
            if (user.sa_course_id != null) {
              myUser.courseId = user.sa_course_id;
            } else {
              myUser.courseId = 0;
            }
            myUser.userEmployeeId = user.user_employee_id;
            myUser.userStudentId = user.user_student_id;
            myUser.userInstituteId = user.user_institute_id;
            myUser.userOfficeId = user.user_office_id;
            myUser.code = "100";
            myUser.userAccessMultipleColleges = user.user_access_multiple_colleges;
            myUser.instituteName = user.institute_name;
            myUser.employeeMobile = user.employeeMobile;
            myUser.positionName = user.employeePosition;
            // console.log("MY ROLE => ", user.role_name);

            if (user.role_name != null && user.role_name !== "") {
              myUser.role = user.role_name;
            } else {
              /*if (user.user_access_multiple_colleges != undefined && user.user_access_multiple_colleges) {
                  myUser.role = Role.Admin;
                } else*/
              if (user.is_software_admin != undefined && user.is_software_admin) {
                myUser.role = Role.Admin;
              } else if (user.user_employee_id != undefined && user.user_employee_id != null) {
                myUser.role = Role.Teacher;
              } else {
                myUser.role = Role.Student;
              }
            }
            localStorage.setItem('currentUser', JSON.stringify(myUser));
            localStorage.setItem('token', "123465");
            localStorage.setItem('userDetails', JSON.stringify(myUser));
            this.currentUserSubject.next(myUser);
            return myUser;
          }
        })
      );
  }

  loginById(userId: number) {
    return this.http
      .post<any>(this.loginURLById, {
        userId
      })
      .pipe(
        map((user) => {
          // console.log(user)
          if (user == null) {
            let myUser = new User();
            myUser.code = "200";
            return myUser;
          } else {
            sessionStorage.setItem("user", JSON.stringify(user));
            let myUser = new User();
            myUser.id = user.user_id;
            myUser.userUsername = user.user_username;
            myUser.token = 'test';
            myUser.firstName = user.user_fullname;
            // localStorage.setItem('userDetails', JSON.stringify(user));
            myUser.titleName = user.title_name;
            myUser.img = user.user_image;
            if (user.sa_class_id != null) {
              myUser.classId = user.sa_class_id;
            } else {
              myUser.classId = 0;
            }
            if (user.sa_course_id != null) {
              myUser.courseId = user.sa_course_id;
            } else {
              myUser.courseId = 0;
            }
            myUser.userEmployeeId = user.user_employee_id;
            myUser.userStudentId = user.user_student_id;
            myUser.userInstituteId = user.user_institute_id;
            myUser.code = "100";
            myUser.userAccessMultipleColleges = user.user_access_multiple_colleges;
            myUser.instituteName = user.institute_name;
            // console.log("MY ROLE => ", user.role_name);

            if (user.role_name != null && user.role_name !== "") {
              myUser.role = user.role_name;
            } else {
              /*if (user.user_access_multiple_colleges != undefined && user.user_access_multiple_colleges) {
                  myUser.role = Role.Admin;
                } else*/
              if (user.is_software_admin != undefined && user.is_software_admin) {
                myUser.role = Role.Admin;
              } else if (user.user_employee_id != undefined && user.user_employee_id != null) {
                myUser.role = Role.Teacher;
              } else {
                myUser.role = Role.Student;
              }
            }
            localStorage.setItem('currentUser', JSON.stringify(myUser));
            localStorage.setItem('token', "123465");
            localStorage.setItem('userDetails', JSON.stringify(myUser));
            this.currentUserSubject.next(myUser);
            // console.log("userDetails => " + JSON.stringify(myUser));
            return myUser;
          }
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
