import {LoginModel, RegisterModel} from '../types/commonTypes';
import {Observable} from 'rxjs';

export interface AuthServiceInterface {
    login: (model: LoginModel) => Observable<void>;

    register: (model: RegisterModel) => void;

    isLoggedIn: () => boolean;

    getUserNameFromToken: () => string;

    getJwtToken: () => string;

    getUserIdFromToken: () => number;

    getDecodedJwtToken: () => any;

    getMainPhoto: () => string;
}
