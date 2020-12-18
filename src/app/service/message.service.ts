import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {BehaviorSubject} from 'rxjs';
import {ApiUser, Message} from '../types/commonTypes';
import {environment} from '../../environments/environment.local';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private hubConnection: HubConnection;
    private messageThreadSource = new BehaviorSubject<Message[]>([]);
    messageThread$ = this.messageThreadSource.asObservable();

    constructor() {
    }

    createHubConnection = (targetUserId: number) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`/${environment.hubUrl}/mewssage?user=${targetUserId}`, {
                accessTokenFactory: () => localStorage.getItem('token')
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.start().catch(error => console.log(error));

        this.hubConnection.on('ReceiveMessageThread', messages => {
            this.messageThreadSource.next(messages);
        });

        this.hubConnection.on('NewMessage', message => {
            this.messageThread$.pipe(take(1)).subscribe(messages => {
                this.messageThreadSource.next([...messages, message]);
            });
        });
    };

    stopHubConnection = () => this.hubConnection.stop();

    sendMessage = (targetUserId: number, content: string) => this.hubConnection
        .invoke('SendMessage', {targetUserId, content})
        .catch(error => console.log(error));
}
