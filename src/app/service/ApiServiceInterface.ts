import {Observable} from 'rxjs';

export interface ApiServiceInterface {
    get: <T>(url: string) => Observable<T>;
}
