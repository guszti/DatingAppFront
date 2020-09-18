import {LoginModel} from '../types/commonTypes';

export interface RegisterComponentInterface {
    model: LoginModel;

    register: () => void;
    cancel: () => void;
}
