import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AlertifyServiceInterface} from '../service/AlertifyServiceInterface';
import {AlertifyService} from '../service/alertify.service';
import {Router} from '@angular/router';
import {PresenceService} from '../service/presence.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    model = {
        username: '',
        password: ''
    };

    authServiceInterface: AuthServiceInterface;
    private alertifyServiceInterface: AlertifyServiceInterface;
    private router: Router;
    private presenceService: PresenceService;

    constructor(authServiceInterface: AuthService, alertifyServiceInterface: AlertifyService, router: Router, presenceService: PresenceService) {
        this.authServiceInterface = authServiceInterface;
        this.alertifyServiceInterface = alertifyServiceInterface;
        this.router = router;
        this.presenceService = presenceService;
    }

    ngOnInit(): void {
    }

    login = () =>
        this.authServiceInterface.login(this.model).subscribe(next => {
            this.router.navigate(['/members']);
            this.alertifyServiceInterface.success('Logged In');
        });

    isLoggedIn = () => this.authServiceInterface.isLoggedIn();

    logOut = () => {
        localStorage.removeItem('token');

        this.presenceService.stopHubConnection();
        this.router.navigate(['/home']);
        this.alertifyServiceInterface.message('Logged Out');
    };
}
