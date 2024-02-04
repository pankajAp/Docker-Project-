import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Roles} from './roles.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class RolesService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<Roles[]> = new BehaviorSubject<Roles[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Roles[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  // get(url, request): Observable<any> {
  //   let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
  //   request.institute_id = userDetails.institute_id;
  //   // this.isTblLoading = false;
  //   return this.http.post(this.path + url + '/get/', JSON.stringify(request), {headers: this.header}).pipe(
  //     catchError(this.handleError));
  //   // .catch(this.handleError);
  // }
  getAllRoles(): void {
    this.httpClient.get<Roles[]>(this.path + 'mst_role/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table ROLE => ", data["content"]);
        this.isTblLoading = false;
        this.dataChange.next(data["content"]);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addRoles(roles: Roles): void {
    this.dialogData = roles;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateRoles(roles: Roles): void {
    this.dialogData = roles;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteRoles(roleId: number): void {
    this.httpClient.delete(this.path + 'mst_role' + '/delete/' + roleId).subscribe(data => {
        console.log(roleId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
