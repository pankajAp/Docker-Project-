import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DocFileTypes} from './doc-file-types.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class DocFileTypesService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_upload_document';
  private globalpath = new Globalpath();
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<DocFileTypes[]> = new BehaviorSubject<DocFileTypes[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): DocFileTypes[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDocFileTypes(): void {
    this.httpClient.get<DocFileTypes[]>(this.path + 'mst_doc_file_type' + '/all', {}).subscribe(
      (data) => {
        // console.log(data);
        this.isTblLoading = false;
        this.dataChange.next(data['content']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        // console.log(error.name + ' ' + error.message);
      }
    );
  }

  addDocFileTypes(docFileType: DocFileTypes): void {
    this.dialogData = docFileType;
    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateUploadDocuments(url, docFileType: DocFileTypes): void {
    // console.log(docFileType);
    this.dialogData = docFileType;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteDocFileType(dftId: number): void {
    this.httpClient.delete(this.path + 'mst_doc_file_type' + '/delete/' + dftId).subscribe(data => {
        // console.log(dftId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
