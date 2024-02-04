import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Actions} from './actions.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class ActionsService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<Actions[]> = new BehaviorSubject<Actions[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): Actions[] {
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

  getAllActions(): void {
    this.httpClient.get<Actions[]>(this.path + 'mst_action/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table ACTION=> ", data["content"]);
        this.isTblLoading = false;
        this.dataChange.next(data["content"]);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addActions(actions: Actions): void {
    this.dialogData = actions;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(actions: Actions): void {
    this.dialogData = actions;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(actionId: number): void {
    console.log(actionId);

    this.httpClient.delete(this.path + 'mst_action' + '/delete/' + actionId).subscribe(data => {
        console.log(actionId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

}
