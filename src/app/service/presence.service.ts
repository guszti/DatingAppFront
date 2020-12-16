import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.local';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {AlertifyService} from './alertify.service';
import {ApiUser} from '../types/commonTypes';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PresenceService {
    hubUrl = environment.hubUrl;
    private hubConnection: HubConnection;
    private onlineUsersSource = new BehaviorSubject<number[]>([]);
    onlineUsers$ = this.onlineUsersSource.asObservable();

    constructor(private alertifyService: AlertifyService) {
    }

    createHubConnection(token: string) {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${this.hubUrl}/presence`, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .catch(error => console.log(error));

        this.hubConnection.on('UserIsOnline', username => {
            this.alertifyService.warning(username + ' connected');
        });

        this.hubConnection.on('UserIsOffline', username => {
            this.alertifyService.warning(username + ' offline');
        });

        this.hubConnection.on('GetOnlineUsers', (userIds: number[]) => {
            this.onlineUsersSource.next(userIds);
        });
    }

    stopHubConnection = () => this.hubConnection.stop().catch(error => console.log(error));
}
