import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Globalpath} from 'src/app/sharing/globalpath';
// import { MessageService } from 'primeng/api';
import {Router} from '@angular/router';
import {AppError} from './errors/app-error';
// import 'rxjs/add/observable/throw';
import {catchError, map} from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class globalService {
  private globalpath = new Globalpath();
  private path = this.globalpath.path;
  private basepath = this.globalpath.base_path;
  public filePath = this.globalpath.filePath;
  private header = new HttpHeaders();

  // isTblLoading = true;
  constructor(private http: HttpClient) {
    this.header = this.header.set('Content-Type', 'application/json');
    this.header = this.header.set('Authorization', this.globalpath.getToken());
    // console.log("Token => ", this.globalpath.getToken());
  }

  get(url, request): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    request.institute_id = userDetails.institute_id;
    return this.http.post(this.path + url + '/get/', JSON.stringify(request), {headers: this.header}).pipe(catchError(this.handleError));
  }

  getData(url, request): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    request.institute_id = userDetails.institute_id;
    return this.http.get(this.path + url).pipe(catchError(this.handleError));
  }

  getAllData(url, request): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    request.institute_id = userDetails.institute_id;
    return this.http.get(this.basepath + url).pipe(catchError(this.handleError));
  }

  getByObjectId(url, request): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    request.institute_id = userDetails.institute_id;
    return this.http.post(this.path + url + '/getByObjectId/', JSON.stringify(request), {headers: this.header}).pipe(catchError(this.handleError));
  }

  getDistinctByObjectId(url, request): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    request.institute_id = userDetails.institute_id;
    return this.http.post(this.path + url + '/getDistinctByObjectId/', JSON.stringify(request), {headers: this.header}).pipe(catchError(this.handleError));
  }

  getById(url, id): Observable<any> {
    return this.http.post(this.path + url + '/get/' + id, {}, {headers: this.header}).pipe(catchError(this.handleError));
  }

  add(url, data): Observable<any> {
    // let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // data.institute_id = userDetails.institute_id;
    return this.http.post(this.path + url + '/save', JSON.stringify(data), {headers: this.header}).pipe(map((resp: any) => {
      // console.log("Service Called ==> ");
      if (resp.message != undefined && resp.message != null && resp.message != 'Error' && resp.message != 'Duplicate') {
        return resp;
      } else if (resp.message == 'Duplicate') {
        return resp.message;
      } else {
        return false;
      }
    }), catchError(this.handleError));
  }

  addWithFullURL(url, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Stringify Data => ", JSON.stringify(data));
    // console.log(this.path + url);
    data.institute_id = (userDetails != null && userDetails !== undefined) ? userDetails.institute_id : 1;
    return this.http.post(this.path + url, JSON.stringify(data), {headers: this.header}).pipe(map((resp: any) => {
      // return this.http.post(this.path + url + '/add_record', JSON.stringify(data), {headers:this.header})
      //     // .map( (resp: any) => {
      // console.log("Service Called ==> ");
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  addArrayData(url, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Questionnaire Ans Data => ", data);
    return this.http.post(this.path + url + '/save', data, {headers: this.header}).pipe(map((resp: any) => {
      // console.log(data);
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  addArrayDataFullURL(url, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Questionnaire Ans Data => ", data);
    return this.http.post(this.path + url, data, {headers: this.header}).pipe(map((resp: any) => {
      // console.log(data);
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  updateArrayData(url, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Header => ", this.header);
    // data.institute_id = userDetails.institute_id;
    return this.http.post(this.path + url + '/update', data, {headers: this.header}).pipe(map((resp: any) => {
      // return this.http.post(this.path + url + '/add_record', JSON.stringify(data), {headers:this.header})
      //     // .map( (resp: any) => {
      // console.log(data);
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  update(url, data): Observable<any> {
    return this.http.post(this.path + url + '/edit_record', JSON.stringify(data), {headers: this.header})
      .pipe(map((resp: any) => {
        if (resp.message != undefined && resp.message != null && resp.message != 'Error')
          return true;
        return false;
      }), catchError(this.handleError));
  }

  patch(url, data): Observable<any> {
    return this.http.patch(this.path + url, JSON.stringify(data), {headers: this.header})
      .pipe(map((resp: any) => {
        if (resp.message != undefined && resp.message != null && resp.message != 'Error')
          return true;
        return false;
      }), catchError(this.handleError));
  }

  // /*Start File Upload Demo*/
  upload(url, formData) {
    let uploadHeader = new HttpHeaders();
    uploadHeader = uploadHeader.set('Authorization', this.globalpath.getToken());
    return this.http.post<any>(this.path + url + '/save', formData, {
      headers: uploadHeader
    }).pipe(map((resp: any) => {
      // console.log("Upload Document => ", resp);
      if (resp.message !== undefined && resp.message != null && resp.message !== 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  uploadWithoutAuth(url, formData) {
    let uploadHeader = new HttpHeaders();
    uploadHeader = uploadHeader.set('Authorization', 'AMOL');
    return this.http.post<any>(this.path + url + '/save', formData, {
      headers: uploadHeader
    }).pipe(map((resp: any) => {
      if (resp.message !== undefined && resp.message != null && resp.message !== 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  addWithoutAuth(url, data): Observable<any> {
    let withoutAuthHeader = new HttpHeaders();
    withoutAuthHeader = withoutAuthHeader.set('Content-Type', 'application/json');
    withoutAuthHeader = withoutAuthHeader.set('Authorization', 'AMOL');
    return this.http.post(this.path + url + '/save', JSON.stringify(data), {headers: withoutAuthHeader}).pipe(map((resp: any) => {
      // console.log("Service Called ==> ");
      if (resp.message != undefined && resp.message != null && resp.message != 'Error' && resp.message != 'Duplicate') {
        return resp;
      } else if (resp.message == 'Duplicate') {
        return resp.message;
      } else {
        return false;
      }
    }), catchError(this.handleError));
  }

  editUpload(url, formData) {
    let uploadHeader = new HttpHeaders();
    uploadHeader = uploadHeader.set('Authorization', this.globalpath.getToken());
    return this.http.post<any>(this.path + url + '/edit_record', formData, {
      headers: uploadHeader
    }).pipe(map((resp: any) => {
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  dropdown(url, request): Observable<any> {
    return this.http.get(this.path + url).pipe(
      catchError(this.handleError));
    // .catch(this.handleError);;
  }

  delete(url, id): Observable<any> {
    return this.http.delete(this.path + url + '/trash/' + id, {headers: this.header})
      .pipe(map((resp: any) => {
        if (resp.status)
          return true;
        return false;
      }), catchError(this.handleError));
  }

  updaterecord(url, data): Observable<any> {
    return this.http.post(this.basepath + url, JSON.stringify(data), {headers: this.header})
      .pipe(map((resp: any) => {
        return resp;
      }), catchError(this.handleError));
  }

  updateIdData(url, id, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Header => ", this.header);
    return this.http.post(this.path + url + '/update/' + id, data, {headers: this.header}).pipe(map((resp: any) => {
      // console.log(data);
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  updateIdDataWithFullURL(url, id, data): Observable<any> {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    // console.log("Header => ", this.header);
    return this.http.post(this.path + url + id, data, {headers: this.header}).pipe(map((resp: any) => {
      // console.log(data);
      if (resp.message != undefined && resp.message != null && resp.message != 'Error')
        return resp;
      return false;
    }), catchError(this.handleError));
  }

  getImageHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = "123456";
    // headers = headers.append('X-TenantID', sessionStorage.getItem('orgId'));
    if (token !== null) {
      headers = headers.append('Authorization', token);
    }
    return headers;
  }

  postImage(url: string, body: object): Observable<any> {
    return this.http.post(this.path + url, body, {headers: this.getImageHeaders()});
  }

  private handleError(error: Response) {
    // return Observable.throw( new AppError);
    return throwError(new AppError);
  }
}
