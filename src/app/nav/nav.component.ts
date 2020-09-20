import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {NavComponentInterface} from './NavComponentInterface';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';
import {Router} from '@angular/router';

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
    private router: Router;

    constructor(authServiceInterface: AuthService, alertifyServiceInterface: AlertifyService, router: Router) {
        this.authServiceInterface = authServiceInterface;
        this.alertifyServiceInterface = alertifyServiceInterface;
        this.router = router;
    }

    ngOnInit() {
    }

    login = () => {
        this.authServiceInterface.login(this.model).subscribe(next => {
            this.router.navigate(['/members']);
            this.alertifyServiceInterface.success('Logged In');
        }, error => this.alertifyServiceInterface.error(error));
    };

    isLoggedIn = () => this.authServiceInterface.isLoggedIn();

    logOut = () => {
        localStorage.removeItem('token');

        this.router.navigate(['/home']);
        this.alertifyServiceInterface.message('Logged Out');
    };
}
