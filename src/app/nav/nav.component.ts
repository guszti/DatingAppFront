import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {NavComponentInterface} from './NavComponentInterface';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, NavComponentInterface {
    model = {
        username: '',
        password: ''
    };

    private authServiceInterface: AuthServiceInterface;

    private alertifyServiceInterface: AlertifyServiceInterface;

    constructor(authServiceInterface: AuthService, alertifyServiceInterface: AlertifyService) {
        this.authServiceInterface = authServiceInterface;
        this.alertifyServiceInterface = alertifyServiceInterface;
    }

    ngOnInit() {
    }

    login = () => {
        this.authServiceInterface.login(this.model).subscribe(next => {
            this.alertifyServiceInterface.success('Logged In');
        }, error => this.alertifyServiceInterface.error(error));
    };

    isLoggedIn = () => !!localStorage.getItem('token');

    logOut = () => {
        localStorage.removeItem('token');

        this.alertifyServiceInterface.message('Logged Out');
    };
}
