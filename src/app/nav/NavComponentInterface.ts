import {LoginModel} from '../types/commonTypes';

export interface NavComponentInterface {
    model: LoginModel;

    login: () => void;
}
