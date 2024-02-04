import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DocDtInstituteTemplateModel} from './doc-dt-institute-template.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class DocDtInstituteTemplateService {
  private globalpath = new Globalpath();
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<DocDtInstituteTemplateModel[]> = new BehaviorSubject<DocDtInstituteTemplateModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): DocDtInstituteTemplateModel[] {
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
  getAllDocDtInstituteTemplates(): void {
    console.log("9876543210");
    this.httpClient.get<DocDtInstituteTemplateModel[]>(this.path + "mst_doc_dt_institute_template/all").subscribe(
      (data) => {
        console.log("Data 123 => ", data);
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        // console.log(error.name + ' ' + error.message);
      }
    );
  }

  addDocDtInstituteTemplateModel(docDtInstituteTemplateModel: DocDtInstituteTemplateModel): void {
    this.dialogData = docDtInstituteTemplateModel;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateDocDtInstituteTemplateModel(url, docDtInstituteTemplateData: DocDtInstituteTemplateModel): void {
    // console.log(docDtInstituteTemplateData);
    this.dialogData = docDtInstituteTemplateData;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteDocDtInstituteTemplateModel(qaId: number): void {
    // console.log(qaId);

    this.httpClient.delete(this.path + 'uploaddocument' + '/delete/' + qaId).subscribe(data => {
        // console.log(qaId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
