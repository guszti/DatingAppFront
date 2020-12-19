import {Component, Input, OnInit} from '@angular/core';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AuthService} from '../service/auth.service';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
class RegisterComponent implements OnInit {
    @Input() setIsRegistering: () => void;

    model = {
        username: '',
        plainPassword: '',
        gender: null,
        knownAs: '',
        dateOfBirth: null,
        city: '',
        country: ''
    };

    private authServiceInterface: AuthServiceInterface;
    private alertifyServiceInterface: AlertifyServiceInterface;

    constructor(authService: AuthService, alertifyServiceInterface: AlertifyService) {
        this.authServiceInterface = authService;
        this.alertifyServiceInterface = alertifyServiceInterface;
    }

    ngOnInit(): void {
    }

    register = () => {
        this.authServiceInterface.register(this.model);
    };

    cancel = () => {
        this.setIsRegistering();
    };
}

export default RegisterComponent;
