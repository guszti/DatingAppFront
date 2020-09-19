import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
class ErrorInterceptorService implements HttpInterceptor{
    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> =>
        next.handle(req).pipe(catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }

            if (error instanceof HttpErrorResponse) {
                const appError = error.headers.get('Application-Error');

                if (appError) {
                    return throwError(appError);
                }

                const serverError = error.error;
                let modalStateErrors = '';

                if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }

                return throwError(modalStateErrors || serverError || 'Server error.');
            }
        }));
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true
};
