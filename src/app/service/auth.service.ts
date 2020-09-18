import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse} from '../types/types';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface AuthServiceInterface {
    login: (model: LoginModel) => Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
    private http: HttpClient;
    private url = 'http://localhost:5000/api/auth/login';

    constructor(http: HttpClient) {
        this.http = http;
    }

    login = (model: LoginModel) =>
        this.http.post(this.url, model).pipe(map((response: LoginResponse) => {
            if (response) {
                localStorage.setItem('token', response.token);
            }
        }))
}
