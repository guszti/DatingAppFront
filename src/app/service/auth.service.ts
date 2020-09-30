import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse, RegisterModel} from '../types/commonTypes';
import {map} from 'rxjs/operators';
import {AuthServiceInterface} from './AuthServiceInterface';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiServiceInterface} from './ApiServiceInterface';
import {ApiService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
    private apiServiceInterface: ApiServiceInterface;
    private jwtHelperService: JwtHelperService;

    constructor(http: HttpClient, apiServiceInterface: ApiService) {
        this.apiServiceInterface = apiServiceInterface;
        this.jwtHelperService = new JwtHelperService();
    }

    login = (model: LoginModel) =>
        this.apiServiceInterface.post<LoginResponse>('/auth/login', model)
            .pipe(map((response: LoginResponse) => {
                if (response) {
                    localStorage.setItem('token', response.token);
                }
            }));

    register = (model: RegisterModel) => this.apiServiceInterface
        .post<{}>('/auth/register', model);

    isLoggedIn = () => !this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));

    getUserNameFromToken = () => {
        const decodedToken = this.jwtHelperService.decodeToken(localStorage.getItem('token'));

        return decodedToken.unique_name;
    };
}
