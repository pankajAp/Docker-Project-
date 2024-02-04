import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MainModel} from './main.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class MainService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable_schedule';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<MainModel[]> = new BehaviorSubject<MainModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): MainModel[] {
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
  getAllTimetablesSchedules(): void {
    this.httpClient.get<MainModel[]>(this.path + 'timetableschedule' + '/all/', {}).subscribe(
      (data) => {
        console.log("All Data => ", data);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addTimetableSchedules(mainModel: MainModel): void {
    this.dialogData = mainModel;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateTimetableSchedules(mainModel: MainModel): void {
    this.dialogData = mainModel;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteTimetableSchedules(tsId: number): void {
    console.log(tsId);
    this.httpClient.delete(this.path + 'std_timetable_schedule' + '/trash/' + tsId).subscribe(data => {
        console.log(tsId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
