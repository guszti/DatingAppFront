import {LoginModel, RegisterModel} from '../types/commonTypes';
import {Observable} from 'rxjs';

export interface AuthServiceInterface {
    login: (model: LoginModel) => Observable<void>;

    register: (model: RegisterModel) => Observable<object>;

    isLoggedIn: () => boolean;

    getUserNameFromToken: () => string;
}
