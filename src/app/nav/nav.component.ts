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

    private authService: AuthServiceInterface;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    ngOnInit() {
    }

    login = () => {
        this.authService.login(this.model).subscribe(next => {
            console.log('Logged in!');
        }, error => console.log('Failed to log in!'));
    };

    isLoggedIn = () => !!localStorage.getItem('token');

    logOut = () => localStorage.removeItem('token');
}
