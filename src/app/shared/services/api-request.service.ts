import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserInfoService} from './user-info.service';
import {Observable} from 'rxjs/index';
import {AppConfig} from "../../app-config";


@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  screenWidth: number;
  isMobile: any;

  // private path = new AppConfig().path;
  // private basePath = new AppConfig().basePath;

  constructor(private appConfig: AppConfig,
              private http: HttpClient,
              private router: Router,
              private userInfoService: UserInfoService) {
  }


  /**
   * This is a Global place to add all the request headers for every REST calls
   */
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('X-TenantID', sessionStorage.getItem('orgId'));
    // if (token !== null) {
    //     headers = headers.append('authorization', token);
    // }
    return headers;
  }

  getImageHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.userInfoService.getStoredToken();
    // headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('X-TenantID', sessionStorage.getItem('orgId'));
    // if (token !== null) {
    //     headers = headers.append('authorization', token);
    // }
    return headers;
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    // console.log(this.appConfig.baseApiPath + url);
    return this.http.get(this.appConfig.baseApiPath + url, {headers: this.getHeaders(), params: urlParams});
  }

  post(url: string, body: object): Observable<any> {
    // console.log(this.appConfig.baseApiPath + url);
    // console.log(JSON.stringify(body));
    return this.http.post(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

  postImage(url: string, body: object): Observable<any> {
    return this.http.post(this.appConfig.baseApiPath + url, body, {headers: this.getImageHeaders()});
  }

  put(url: string, body?: object): Observable<any> {
    let me = this;
    // console.log('Api Request Service In PUT ' + JSON.stringify(body));
    return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

  delete(url: string): Observable<any> {
    // console.log('Api Request Service In PUT ' + url);
    return this.http.delete(this.appConfig.baseApiPath + url, {headers: this.getHeaders()});
  }

  deleteById(url: string, body?: object): Observable<any> {
    return this.http.put(this.appConfig.baseApiPath + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

  getComplaintApi(url: string, urlParams?: HttpParams): Observable<any> {
    // console.log(this.appConfig.baseApiPathComplaint + url);
    return this.http.get(this.appConfig.baseApiPathComplaint + url, {headers: this.getHeaders(), params: urlParams});
  }

  postComplaintApi(url: string, body: object): Observable<any> {
    // console.log(this.appConfig.baseApiPathComplaint + url);
    // console.log(JSON.stringify(body));
    return this.http.post(this.appConfig.baseApiPathComplaint + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

  putComplaintApi(url: string, body?: object): Observable<any> {
    let me = this;
    // console.log('Api Request Service In PUT ' + JSON.stringify(body));
    return this.http.put(this.appConfig.baseApiPathComplaint + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

  deleteComplaintApi(url: string): Observable<any> {
    // console.log('Api Request Service In PUT ' + url);
    return this.http.delete(this.appConfig.baseApiPathComplaint + url, {headers: this.getHeaders()});
  }

  deleteComplaintById(url: string, body?: object): Observable<any> {
    return this.http.put(this.appConfig.baseApiPathComplaint + url, JSON.stringify(body), {headers: this.getHeaders()});
  }

}
