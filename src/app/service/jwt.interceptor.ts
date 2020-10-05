import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServiceInterface} from './AuthServiceInterface';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
    private authServiceInterface: AuthServiceInterface;

    constructor(authServiceInterface: AuthService) {
        this.authServiceInterface = authServiceInterface;
    }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const requestClone = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authServiceInterface.getJwtToken()}`,
            },
        });

        return next.handle(requestClone);
    }
}

export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorInterceptor,
    multi: true
};
