import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

export interface ApiServiceInterface {
    get: <T>(url: string) => Observable<T>;

    post: <T>(url: string, data: any) => Observable<T>;

    put: (url: string, data: any) => Observable<{}>;

    patch: (url: string, data: any) => Observable<{}>;

    delete: (url: string) => Observable<{}>;
}
