import {LoginModel} from '../types/commonTypes';
import {Observable} from 'rxjs';

export interface AuthServiceInterface {
    login: (model: LoginModel) => Observable<void>;
}
