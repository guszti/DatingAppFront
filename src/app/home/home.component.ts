import {Component, OnInit} from '@angular/core';
import {HomeComponentInterface} from './HomeComponentInterface';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
class HomeComponent implements OnInit, HomeComponentInterface {
    isRegistering = false;

    ngOnInit() {
    }

    setIsRegistering = () => {
        this.isRegistering = !this.isRegistering;
    };
}

export default HomeComponent;
