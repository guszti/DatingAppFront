import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiUser, LoginModel, LoginResponse, RegisterModel} from '../types/commonTypes';
import {map} from 'rxjs/operators';
import {AuthServiceInterface} from './AuthServiceInterface';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiServiceInterface} from './ApiServiceInterface';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {PresenceService} from './presence.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements AuthServiceInterface {
    private apiServiceInterface: ApiServiceInterface;
    private jwtHelperService: JwtHelperService;
    private router: Router;
    private presenceService: PresenceService;

    constructor(
        http: HttpClient,
        apiServiceInterface: ApiService,
        router: Router,
        presenceService: PresenceService
    ) {
        this.apiServiceInterface = apiServiceInterface;
        this.jwtHelperService = new JwtHelperService();
        this.router = router;
        this.presenceService = presenceService;
    }

    login = (model: LoginModel) =>
        this.apiServiceInterface.post<LoginResponse>('/auth/login', model).pipe(
            map((response: LoginResponse) => {
                if (response) {
                    this.setUserData(response.user);
                    this.router.navigateByUrl('/home');
                }
            })
        );

    register = (model: RegisterModel) =>
        this.apiServiceInterface.post<{}>('/auth/register', model).pipe(
            map((user: ApiUser) => {
                if (user) {
                    this.setUserData(user);
                }
            })
        );

    setUserData = (user: any) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', String(user.id));
        localStorage.setItem('username', user.username);
        localStorage.setItem('photoUrl', user.photoUrl);

        const tokenRoles = this.jwtHelperService.decodeToken(user.token).role;
        const roles = tokenRoles instanceof Array ? tokenRoles : [tokenRoles];

        localStorage.setItem('roles', JSON.stringify(roles));

        this.presenceService.createHubConnection(user.token);
    };

    isLoggedIn = () =>
        !this.jwtHelperService.isTokenExpired(localStorage.getItem('token'));

    getJwtToken = () => localStorage.getItem('token');

    getDecodedJwtToken = () =>
        this.jwtHelperService.decodeToken(this.getJwtToken());

    getUserNameFromToken = () => this.getDecodedJwtToken()?.unique_name;

    getUserIdFromToken = () => this.getDecodedJwtToken()?.nameid;

    getMainPhoto = () => localStorage.getItem('photoUrl');
}
