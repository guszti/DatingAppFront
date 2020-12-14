import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    private authService: AuthServiceInterface;
    private alertifyService: AlertifyServiceInterface;

    constructor(authservice: AuthService, alertifyService: AlertifyService) {
        this.authService = authservice;
        this.alertifyService = alertifyService;
    }

    canActivate(): boolean {
        const roles = localStorage.getItem('roles');

        if (roles.includes('Admin') || roles.includes('Moderator')) {
            return true;
        }

        this.alertifyService.error('Unauthorized.');

        return false;
    }
}
