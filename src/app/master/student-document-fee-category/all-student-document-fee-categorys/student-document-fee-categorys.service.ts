import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StudentDocumentFeeCategorysModel} from './student-document-fee-categorys.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class StudentDocumentFeeCategorysService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<StudentDocumentFeeCategorysModel[]> = new BehaviorSubject<StudentDocumentFeeCategorysModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): StudentDocumentFeeCategorysModel[] {
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
    this.httpClient.get<StudentDocumentFeeCategorysModel[]>(this.path + 'trn_student_document_fee_category/all/', {}).subscribe(
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

  addRoleActions(roleActions: StudentDocumentFeeCategorysModel): void {
    this.dialogData = roleActions;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateRoleActions(roleActions: StudentDocumentFeeCategorysModel): void {
    this.dialogData = roleActions;
  }

  deleteStudentDocumentFeeCategory(sdfcId: number): void {
    console.log(sdfcId);

    this.httpClient.delete(this.path + 'trn_student_document_fee_category' + '/delete/' + sdfcId).subscribe(data => {
        console.log(sdfcId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  deleteBySdfcFcId(sdfcFcId: number, userId): void {
    this.httpClient.delete(this.path + 'trn_student_document_fee_category' + '/deleteBySdfcFcId/' + sdfcFcId + '/' + userId).subscribe(data => {
        console.log(sdfcFcId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
