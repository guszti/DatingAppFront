import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {AlertifyServiceInterface} from './AlertifyServiceInterface';
import {AlertifyService} from './alertify.service';

@Injectable({
    providedIn: 'root'
})
class ErrorInterceptorService implements HttpInterceptor {
    private router: Router;
    private alertifyServiceInterface: AlertifyServiceInterface;

    constructor(router: Router, alertifyServiceInterface: AlertifyService) {
        this.router = router;
        this.alertifyServiceInterface = alertifyServiceInterface;
    }

    intercept = (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> =>
        next.handle(req).pipe(catchError(error => {
            switch (error.status) {
                case 400:
                    if (error.error.errors) {
                        const modalStateErrors = [];

                        for (const key in Object.keys(error.error.errors)) {
                            if (error.error.errors[key]) {
                                modalStateErrors.push(error.error.errors[key]);
                            }
                        }

                        throw modalStateErrors.flat();
                    } else {
                        this.alertifyServiceInterface.error(error.statusText);
                    }

                    break;
                case 401:
                    this.alertifyServiceInterface.error(error.statusText);
                    break;
                case 404:
                    this.router.navigateByUrl('/not-found');
                    break;
                default:
                    this.alertifyServiceInterface.error('Unexpected error.');
                    console.error(error);
                    break;
            }

            return throwError(error);
        }));
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
};
