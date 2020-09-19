import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {NavComponentInterface} from './NavComponentInterface';
import {AuthServiceInterface} from '../service/AuthServiceInterface';

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

    constructor(authService: AuthService) {
        this.authServiceInterface = authService;
    }

    ngOnInit() {
    }

    login = () => {
        this.authServiceInterface.login(this.model).subscribe(next => {
            console.log('Logged in!');
        }, error => console.log('Failed to log in!'));
    };

    isLoggedIn = () => !!localStorage.getItem('token');

    logOut = () => localStorage.removeItem('token');
}
