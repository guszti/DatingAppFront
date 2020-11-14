import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginModel, LoginResponse, RegisterModel} from '../types/commonTypes';
import {map} from 'rxjs/operators';
import {AuthServiceInterface} from './AuthServiceInterface';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiServiceInterface} from './ApiServiceInterface';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
    private apiServiceInterface: ApiServiceInterface;
    private jwtHelperService: JwtHelperService;
    private router: Router;

    constructor(
        http: HttpClient,
        apiServiceInterface: ApiService,
        router: Router
    ) {
        this.apiServiceInterface = apiServiceInterface;
        this.jwtHelperService = new JwtHelperService();
        this.router = router;
    }

    login = (model: LoginModel) =>
        this.apiServiceInterface.post<LoginResponse>('/auth/login', model).pipe(
            map((response: LoginResponse) => {
                if (response) {
                    localStorage.setItem('token', response.user.token);
                    localStorage.setItem('userId', String(response.user.id));
                    localStorage.setItem('username', response.user.username);
                    localStorage.setItem('photoUrl', response.user.photoUrl);

                    this.router.navigateByUrl('/home');
                }
            })
        );

    register = (model: RegisterModel) =>
        this.apiServiceInterface.post<{}>('/auth/register', model);

    isLoggedIn = () =>
        !this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));

    getJwtToken = () => localStorage.getItem('token');

    getDecodedJwtToken = () =>
        this.jwtHelperService.decodeToken(this.getJwtToken());

    getUserNameFromToken = () => this.getDecodedJwtToken()?.unique_name;

    getUserIdFromToken = () => this.getDecodedJwtToken()?.nameid;

    getMainPhoto = () => localStorage.getItem('photoUrl');
}
