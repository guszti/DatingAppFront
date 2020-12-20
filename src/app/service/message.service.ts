import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {BehaviorSubject} from 'rxjs';
import {ApiUser, Group, Message} from '../types/commonTypes';
import {environment} from '../../environments/environment.local';
import {take} from 'rxjs/operators';
import {AlertifyService} from './alertify.service';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private hubConnection: HubConnection;
    private messageThreadSource = new BehaviorSubject<Message[]>([]);
    messageThread$ = this.messageThreadSource.asObservable();

    constructor() {
    }

    createHubConnection = (targetUserId: number, targetUsername: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.hubUrl}/message?user=${targetUserId}`, {
                accessTokenFactory: () => localStorage.getItem('token')
            })
            .withAutomaticReconnect()
            .build();

        this.hubConnection.start()
            .then(() => console.log('connection started'))
            .catch(error => console.log(error));


        this.hubConnection.on('ReceiveMessageThread', messages => {
            this.messageThreadSource.next(messages);
        });

        this.hubConnection.on('NewMessage', message => {
            this.messageThread$.pipe(take(1)).subscribe(messages => {
                this.messageThreadSource.next([...messages, message]);
            });
        });

        this.hubConnection.on('UpdatedGroup', (group: Group) => {
            if (group.connections.some(x => x.username === targetUsername)) {
                this.messageThread$.pipe(take(1)).subscribe(messages => {
                    messages.forEach(message => {
                        if (!message.seenAt) {
                            message.seenAt = new Date(Date.now());
                        }
                    });

                    this.messageThreadSource.next([...messages]);
                });
            }
        });
    };

    stopHubConnection = () => this.hubConnection.stop();

    sendMessage = async (targetUserId: number, content: string) => this.hubConnection
        .invoke('SendMessage', {targetUserId, content})
        .catch(error => console.log(error));
}
