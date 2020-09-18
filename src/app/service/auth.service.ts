import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse} from '../types/commonTypes';
import {map} from 'rxjs/operators';
import {AuthServiceInterface} from './AuthServiceInterface';

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
