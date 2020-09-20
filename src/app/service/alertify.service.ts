import {AlertifyServiceInterface} from './AlertifyServiceInterface';
import {Injectable} from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
    providedIn: 'root'
})
export class AlertifyService implements AlertifyServiceInterface {
    constructor() {
    }

    confirm = (message: string, onConfirm: () => void) =>
        alertify.confirm(message, (e: any) => {
            if (e) {
                onConfirm();
            } else {

            }
        });

    success = (message: string) => alertify.success(message);

    error = (message: string) => alertify.error(message);

    message = (message: string) => alertify.message(message);

    warning = (message: string) => alertify.warning(message);
}
