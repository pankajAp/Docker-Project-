import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StudentDocuments} from './student-documents.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class StudentDocumentsService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<StudentDocuments[]> = new BehaviorSubject<StudentDocuments[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): StudentDocuments[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllStudentDocuments(): void {
    this.httpClient.get<StudentDocuments[]>(this.path + 'mst_student_document/all/', {}).subscribe(
      (data) => {
        console.log("Data for Display in Table ACTION=> ", data['content']);
        this.isTblLoading = false;
        this.dataChange.next(data['content']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addActions(studentDocuments: StudentDocuments): void {
    this.dialogData = studentDocuments;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(studentDocuments: StudentDocuments): void {
    this.dialogData = studentDocuments;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(sdId: number): void {
    console.log(sdId);

    this.httpClient.delete(this.path + 'mst_student_document' + '/delete/' + sdId).subscribe(data => {
        console.log(sdId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
