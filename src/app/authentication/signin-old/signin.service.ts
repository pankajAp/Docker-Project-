import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Globalpath} from 'src/app/sharing/globalpath';
import {Observable, throwError} from 'rxjs';
import {AppError} from 'src/app/sharing/errors/app-error';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private path = new Globalpath().path;
  private globalpath = new Globalpath();
  private header = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.header = this.header.set('Content-Type', 'application/json');
    this.header = this.header.set('Authorization', this.globalpath.getToken());

  }

  login(data): Observable<any> {
    return this.http.post(this.path + 'users/login', JSON.stringify(data)).pipe(map((resp: any) => {
      if (resp.status) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userDetails', JSON.stringify(resp.data));
        return true;
      } else {
        return false;
      }
    }), catchError(this.handleError));
  }

  getTrnUserRoleActionByUserId(userId): Observable<any> {
    console.log(this.path + 'trn_user_role_action/byUserId/' + userId);
    return this.http.get(this.path + 'trn_user_role_action/byUserId/' + userId).pipe(catchError(this.handleError));
  }

  getTrnRoleActionByRoleName(roleName): Observable<any> {
    console.log(this.path + 'trn_role_action/allByRaRoleName/' + roleName);
    return this.http.get(this.path + 'trn_role_action/allByRaRoleName/' + roleName).pipe(catchError(this.handleError));
  }

  // getTrnUserROleActionByUserId(): Observable

  handleError(error: Response) {
    // return Observable.throw( new AppError());
    return throwError(error);
  }
}
