import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleActions} from './role-actions.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class RoleActionsService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<RoleActions[]> = new BehaviorSubject<RoleActions[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): RoleActions[] {
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

  getAllRoleActions(): void {
    this.httpClient.get<RoleActions[]>(this.path + 'trn_role_action/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table 1 => ", data);
        // console.log("Data for Display in Table => ", data["content"]);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addRoleActions(roleActions: RoleActions): void {
    this.dialogData = roleActions;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateRoleActions(roleActions: RoleActions): void {
    this.dialogData = roleActions;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteRoleActions(raId: number): void {
    console.log(raId);

    this.httpClient.delete(this.path + 'trn_role_action' + '/delete/' + raId).subscribe(data => {
        console.log(raId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  deleteByRaRoleId(raRoleId: number, userId): void {
    console.log(raRoleId);

    this.httpClient.delete(this.path + 'trn_role_action' + '/deleteByRaRoleId/' + raRoleId + '/' + userId).subscribe(data => {
        console.log(raRoleId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
