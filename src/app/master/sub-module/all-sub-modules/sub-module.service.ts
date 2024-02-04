import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SubModuleModel} from './sub-module.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../../sharing/globalpath";

@Injectable()
export class SubModuleService {
  // private readonly API_URL = 'assets/data/timetables.json';
  // private readonly API_URL = 'http://localhost:8082/smbt_api_21_05_2020_copy/api/std_timetable';
  private globalpath = new Globalpath();
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<SubModuleModel[]> = new BehaviorSubject<SubModuleModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) {
  }

  get data(): SubModuleModel[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAllModules(): void {
    this.httpClient.get<SubModuleModel[]>(this.path + 'mst_sub_module/all/', {}).subscribe(
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

  addActions(modules: SubModuleModel): void {
    this.dialogData = modules;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }

  updateActions(modules: SubModuleModel): void {
    this.dialogData = modules;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }

  deleteActions(smId: number): void {
    // console.log(smId);

    this.httpClient.delete(this.path + 'mst_sub_module' + '/delete/' + smId).subscribe(data => {
        // console.log(smId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
