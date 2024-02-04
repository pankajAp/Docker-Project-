import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRoleActions} from './user-role-actions.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class UserRoleActionsService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  private basePath = this.globalpath.base_path;
  isTblLoading = true;
  dataChange: BehaviorSubject<UserRoleActions[]> = new BehaviorSubject<UserRoleActions[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): UserRoleActions[] {
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

  getAllUserRoleActions(): void {
    this.httpClient.get<UserRoleActions[]>(this.path + 'trn_user_role_action/all/', {}).subscribe(
      (data) => {
        console.log("trn_user_role_action Table 1 => ", data);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addUserRoleActions(userRoleActions: UserRoleActions): void {
    this.dialogData = userRoleActions;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateUserRoleActions(userRoleActions: UserRoleActions): void {
    this.dialogData = userRoleActions;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteUserRoleActions(roleActionId: number): void {
    console.log(roleActionId);

    this.httpClient.delete(this.path + 'trn_user_role_action' + '/delete/' + roleActionId).subscribe(data => {
        console.log("Deleted Id : ", roleActionId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  // getUsersList(): void {
  //   // console.log(roleActionId);

  //   this.httpClient.get(this.basePath + '/all').subscribe(data => {
  //       console.log("USER LIST IN ", data);
  //     },
  //     (err: HttpErrorResponse) => {
  //       // error code here
  //     }
  //   );
  // }
}
