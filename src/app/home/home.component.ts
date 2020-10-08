import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
class HomeComponent implements OnInit {
    isRegistering = false;

    ngOnInit(): void {
    }

    setIsRegistering = () => {
        this.isRegistering = !this.isRegistering;
    }
}

export default HomeComponent;
