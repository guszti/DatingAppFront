import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthServiceInterface} from '../service/AuthServiceInterface';
import {AuthService} from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private authServiceInterface: AuthServiceInterface;
    private router: Router;

    constructor(authServiceInterface: AuthService, router: Router) {
        this.authServiceInterface = authServiceInterface;
        this.router = router;
    }

    canActivate = (): boolean => {
        if (this.authServiceInterface.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/home']);

        return false;
    };
}
