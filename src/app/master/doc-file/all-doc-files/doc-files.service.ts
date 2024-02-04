import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DocFilesModel} from './doc-files.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class DocFilesService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<DocFilesModel[]> = new BehaviorSubject<DocFilesModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): DocFilesModel[] {
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
    this.httpClient.get<DocFilesModel[]>(this.path + 'mst_doc_file/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table mst_doc_file=> ", data["content"]);
        this.isTblLoading = false;
        this.dataChange.next(data["content"]);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addDocFiles(docFileModel: DocFilesModel): void {
    this.dialogData = docFileModel;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(docFileModel: DocFilesModel): void {
    this.dialogData = docFileModel;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteDocFiles(dfId: number): void {
    console.log(dfId);

    this.httpClient.delete(this.path + 'mst_doc_file' + '/delete/' + dfId).subscribe(data => {
        console.log(dfId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

}
