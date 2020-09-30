import {Observable} from 'rxjs';

export interface ApiServiceInterface {
    get: <T>(url: string) => Observable<T>;

    post: <T>(url: string, data: any) => Observable<T>;
}
