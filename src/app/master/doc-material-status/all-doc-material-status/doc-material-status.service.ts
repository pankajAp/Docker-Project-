import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DoaAmounts} from './doc-material-status.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class DocMaterialStatusService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<DoaAmounts[]> = new BehaviorSubject<DoaAmounts[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): DoaAmounts[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDoaAmounts(): void {
    this.httpClient.get<DoaAmounts[]>(this.path + 'mst_doc_material_status/all/', {}).subscribe(
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

  addActions(actions: DoaAmounts): void {
    this.dialogData = actions;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(actions: DoaAmounts): void {
    this.dialogData = actions;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(dmsId: number): void {
    console.log(dmsId);

    this.httpClient.delete(this.path + 'mst_doc_material_status' + '/delete/' + dmsId).subscribe(data => {
        console.log(dmsId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

}
