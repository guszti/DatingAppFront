import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse, RegisterModel} from '../types/commonTypes';
import {map} from 'rxjs/operators';
import {AuthServiceInterface} from './AuthServiceInterface';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
    private http: HttpClient;
    private url = 'http://localhost:5000/api/auth';
    private jwtHelperService: JwtHelperService;

    constructor(http: HttpClient) {
        this.http = http;
        this.jwtHelperService = new JwtHelperService();
    }

    login = (model: LoginModel) =>
        this.http.post(`${this.url}/login`, model).pipe(map((response: LoginResponse) => {
            if (response) {
                localStorage.setItem('token', response.token);
            }
        }));

    register = (model: RegisterModel) => this.http.post(`${this.url}/register`, model);

    isLoggedIn = () => !this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));
}
