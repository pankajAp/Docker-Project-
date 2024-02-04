import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ChangePassword} from './change-password.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Globalpath} from "../../sharing/globalpath";

@Injectable()
export class ChangePasswordService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_upload_document';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<ChangePassword[]> = new BehaviorSubject<ChangePassword[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): ChangePassword[] {
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
  getAllUploadDocuments(): void {
    this.httpClient.get<ChangePassword[]>(this.path + 'uploaddocument' + '/all/', {}).subscribe(
      (data) => {
        console.log(data);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addUploadDocuments(uploadDocuments: ChangePassword): void {
    this.dialogData = uploadDocuments;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateUploadDocuments(url, uploadDocuments: ChangePassword): void {
    console.log(uploadDocuments);
    this.dialogData = uploadDocuments;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteUploadDocuments(udId: number): void {
    console.log(udId);

    this.httpClient.delete(this.path + 'uploaddocument' + '/delete/' + udId).subscribe(data => {
        console.log(udId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );

    //   return this.http.delete(this.path + url + '/trash/' + id, {headers: this.header})
    //     .pipe(map( (resp: any) => {
    //       if (resp.status)
    //         return true;
    //       return false;
    //     }), catchError(this.handleError));
  }
}
