import {Component, OnInit} from '@angular/core';
import {RegisterComponentInterface} from '../types/types';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
class RegisterComponent implements OnInit, RegisterComponentInterface {
    model = {
        username: '',
        password: ''
    };

    ngOnInit() {
    }

    register = () => {
    };

    cancel = () => {
    };
}

export default RegisterComponent;
