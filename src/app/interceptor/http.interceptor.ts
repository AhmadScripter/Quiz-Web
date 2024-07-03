import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreloaderService } from '../services/preloader.service';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private preloaderService: PreloaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preloaderService.show();

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.preloaderService.hide();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.preloaderService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.preloaderService.hide();
      })
    );
  }
}