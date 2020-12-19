import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';
import {PresenceService} from './service/presence.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'DatingAppFrontend';

    constructor(private authService: AuthService, private presenceService: PresenceService) {
    }

    ngOnInit() {
        this.setCurrentUser();
    }

    setCurrentUser = () => {
        const token = this.authService.getJwtToken();

        if (token) {
            this.presenceService.createHubConnection(token);
        }
    };
}
