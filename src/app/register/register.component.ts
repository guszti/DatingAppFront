import {Component, Input, OnInit} from '@angular/core';
import {RegisterComponentInterface} from './RegisterComponentInterface';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AuthService} from '../service/auth.service';

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

    constructor(authService: AuthService) {
        this.authServiceInterface = authService;
    }

    ngOnInit() {
    }

    register = () => {
        this.authServiceInterface.register(this.model).subscribe(() => console.log('Registered'), e => console.log(e));
    };

    cancel = () => {
        this.setIsRegistering();
    };
}

export default RegisterComponent;
