import {Component, OnInit} from '@angular/core';
import {Message, Pagination} from '../types/commonTypes';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    apiService: ApiServiceInterface;
    messages: Message[];
    pagination: Pagination;
    container: 'Unread' | 'Inbox' | 'Sent' = 'Unread';
    page = 1;
    limit = 5;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages = () => {
        this.apiService.get<Message[]>(`/message?page=${this.page}&limit=${this.limit}&status=${this.container}`)
            .subscribe(response => {
                this.messages = response.body;

                if (response.headers.get('Pagination')) {
                    this.pagination = JSON.parse(response.headers.get('Pagination'));
                }
            });
    };

    switchPage = (event: any) => {
        this.page = event.page;
        this.loadMessages();
    };

    deleteMessage = (id: number) => {
        this.apiService.delete(`/message/${id}`).subscribe(() => {
            const messageIndex = this.messages.findIndex(message => message.id === id);

            this.messages.splice(messageIndex, 1);
        });
    }
}
