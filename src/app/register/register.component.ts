import {Component, Input, OnInit} from '@angular/core';
import {RegisterComponentInterface} from './RegisterComponentInterface';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AuthService} from '../service/auth.service';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
class RegisterComponent implements OnInit, RegisterComponentInterface {
    @Input() setIsRegistering: () => void;

    model = {
        username: '',
        password: ''
    };

    private authServiceInterface: AuthServiceInterface;
    private alertifyServiceInterface: AlertifyServiceInterface;

    constructor(authService: AuthService, alertifyServiceInterface: AlertifyService) {
        this.authServiceInterface = authService;
        this.alertifyServiceInterface = alertifyServiceInterface;
    }

    ngOnInit() {
    }

    register = () => {
        this.authServiceInterface.register(this.model).subscribe(() =>
                this.alertifyServiceInterface.success('Registered Successfully'),
            e => this.alertifyServiceInterface.error(e)
        );
    };

    cancel = () => {
        this.setIsRegistering();
    };
}

export default RegisterComponent;
