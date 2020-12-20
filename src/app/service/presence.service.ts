import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.local';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {AlertifyService} from './alertify.service';
import {BehaviorSubject} from 'rxjs';
import {take} from 'rxjs/operators';

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

    createHubConnection = (token: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${this.hubUrl}/presence`, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection
            .start()
            .catch(error => console.log(error));

        this.hubConnection.on('UserIsOnline', userId => {
            this.onlineUsers$.pipe(take(1)).subscribe(userIds => {
                this.onlineUsersSource.next([...userIds, userId]);
            });
        });

        this.hubConnection.on('UserIsOffline', userId => {
            this.onlineUsers$.pipe(take(1)).subscribe(userIds => {
                this.onlineUsersSource.next([...userIds.filter(id => id !== userId)]);
            });
        });

        this.hubConnection.on('GetOnlineUsers', (userIds: number[]) => {
            this.onlineUsersSource.next(userIds);
        });

        this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
            this.alertifyService.message(`${knownAs || username} sent you a message!`);
        });
    }

    stopHubConnection = () => this.hubConnection.stop().catch(error => console.log(error));
}
