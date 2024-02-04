import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
// import {StaffModel} from './modules.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";
import {StaffModel} from "./staff.model";

@Injectable()
export class StaffService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath();
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<StaffModel[]> = new BehaviorSubject<StaffModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): StaffModel[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllModules(): void {
    this.httpClient.get<StaffModel[]>(this.path + 'mst_staff/all', {}).subscribe(
      (data) => {
        // console.log("Data for Display in Table ACTION=> ", data['content']);
        this.isTblLoading = false;
        this.dataChange.next(data['content']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        // console.log(error.name + ' ' + error.message);
      }
    );
  }

  addActions(modules: StaffModel): void {
    this.dialogData = modules;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(modules: StaffModel): void {
    this.dialogData = modules;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(staffId: number): void {
    // console.log(moduleId);

    this.httpClient.delete(this.path + 'mst_staff' + '/delete/' + staffId).subscribe(data => {
        // console.log(moduleId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
