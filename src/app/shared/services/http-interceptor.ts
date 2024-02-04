import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterService} from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercept implements HttpInterceptor {
  constructor(public router: Router, public tosterService: ToasterService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            if (error instanceof HttpErrorResponse) {
              switch (error.status) {
                case 401:
                  // this.tosterService.presentError('danger', error.message);
                  break;
                case 403:
                  // console.log('unauthorized request');
                  // this.tosterService.presentError('danger', error.message);
                  break;
                case 404:
                  // console.log('Service not found');
                  // this.tosterService.presentError('danger', error.message);
                  break;
                case 408:
                  // console.log('Request Timedout');
                  // this.tosterService.presentError('danger', error.message);
                  break;
                case 500:
                  // console.log('Internal Server Error');
                  // this.tosterService.presentError('danger', error.message);
                  break;
                default:
                  // console.log('Server Error' + JSON.stringify(error));
                  // this.tosterService.presentError('danger', error.message);
                  break;
              }
              // this.tosterService.presentError('danger', error.message);
              return throwError(error.message);
            } else {
              this.tosterService.presentError('danger', JSON.stringify(error));
              return throwError(error);
            }
          }
        )
      );
  }
}
