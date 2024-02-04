import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ComplaintOffice} from './complaint-offices.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class ComplaintOfficesService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<ComplaintOffice[]> = new BehaviorSubject<ComplaintOffice[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): ComplaintOffice[] {
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

  getAllComplaintOffices(): void {
    this.httpClient.get<ComplaintOffice[]>(this.path + 'mst_complaint_office/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table CO=> ", data["content"]);
        this.isTblLoading = false;
        this.dataChange.next(data["content"]);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addActions(complaintOffice: ComplaintOffice): void {
    this.dialogData = complaintOffice;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(complaintOffice: ComplaintOffice): void {
    this.dialogData = complaintOffice;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(coId: number): void {
    console.log(coId);

    this.httpClient.delete(this.path + 'mst_complaint_office' + '/delete/' + coId).subscribe(data => {
        console.log(coId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

}
