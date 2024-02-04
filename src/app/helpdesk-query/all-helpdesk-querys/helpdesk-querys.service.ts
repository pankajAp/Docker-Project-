import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HelpdeskQuerysModel } from './helpdesk-querys.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {Globalpath} from "../../sharing/globalpath";
@Injectable()
export class HelpdeskQuerysService {

  private globalpath = new Globalpath()
  private path = this.globalpath.path;
  isTblLoading = true;
  dataChange: BehaviorSubject<HelpdeskQuerysModel[]> = new BehaviorSubject<HelpdeskQuerysModel[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): HelpdeskQuerysModel[] {
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

  getAllHelpdeskQuerys(): void {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.httpClient.get<HelpdeskQuerysModel[]>(this.path + 'mst_helpdesk_query/all',{}).subscribe(
      (data) => {
        console.log("Display All Helpdesk Querys 1 => ", data);
        // console.log("Display All Helpdesk Querys 2 => ", data["content"]);
        this.isTblLoading = false;
        // this.dataChange.next(data["content"]);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  getAllHelpdeskQuerysByStatus(helpdeskQueryStatus: any): void {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.httpClient.get<HelpdeskQuerysModel[]>(this.path + 'mst_helpdesk_query/allByStatus?queryStatus=' + helpdeskQueryStatus,{}).subscribe(
      (data) => {
        console.log("Display All Helpdesk Querys 1 => ", data);
        // console.log("Display All Helpdesk Querys 2 => ", data["content"]);
        this.isTblLoading = false;
        // this.dataChange.next(data["content"]);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  getMyHelpdeskQuerys(): void {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.httpClient.get<HelpdeskQuerysModel[]>(this.path + 'mst_helpdesk_query/allByUserId?userId=' + userDetails.id,{}).subscribe(
      (data) => {
        console.log("Display All Helpdesk Querys 1 => ", data);
        // console.log("Display All Helpdesk Querys 2 => ", data["content"]);
        this.isTblLoading = false;
        // this.dataChange.next(data["content"]);
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  getAssignneeHelpdeskQuerys(): void {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.httpClient.get<HelpdeskQuerysModel[]>(this.path + 'mst_helpdesk_query/allByAssigneeId?userId=' + userDetails.id,{}).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  addHelpdeskQuery(mstHelpdeskQuery: HelpdeskQuerysModel): void {
    this.dialogData = mstHelpdeskQuery;

    /*  this.httpClient.post(this.API_URL, teachers).subscribe(data => {
      this.dialogData = teachers;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateHelpdeskQuerysModel(mstHelpdeskQuery: HelpdeskQuerysModel): void {
    this.dialogData = mstHelpdeskQuery;

    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteHelpdeskQuery(hqId: number): void {
    this.httpClient.delete(this.path + 'mst_helpdesk_query' + '/delete/' + hqId).subscribe(data => {
        console.log("deleted id ", hqId);
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
}
