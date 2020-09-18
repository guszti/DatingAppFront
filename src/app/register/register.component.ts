import {Component, Input, OnInit} from '@angular/core';
import {RegisterComponentInterface} from './RegisterComponentInterface';

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

    ngOnInit() {
    }

    register = () => {
    };

    cancel = () => {
        this.setIsRegistering();
    };
}

export default RegisterComponent;
