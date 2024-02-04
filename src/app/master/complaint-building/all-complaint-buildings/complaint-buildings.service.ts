import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ComplaintBuilding} from './complaint-buildings.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class ComplaintBuildingsService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<ComplaintBuilding[]> = new BehaviorSubject<ComplaintBuilding[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): ComplaintBuilding[] {
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

  getAllComplaintBuildings(): void {
    this.httpClient.get<ComplaintBuilding[]>(this.path + 'mst_complaint_building/all/', {}).subscribe(
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

  addActions(complaintBuilding: ComplaintBuilding): void {
    this.dialogData = complaintBuilding;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(complaintBuilding: ComplaintBuilding): void {
    this.dialogData = complaintBuilding;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(cbId: number): void {
    console.log(cbId);
    this.httpClient.delete(this.path + 'mst_complaint_building' + '/delete/' + cbId).subscribe(data => {
        console.log(cbId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
