import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../types/commonTypes';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiService} from '../../../service/api.service';

@Component({
    selector: 'app-member-messages',
    templateUrl: './member-messages.component.html',
    styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
    @Input() userId: number;
    apiService: ApiServiceInterface;
    messages: Message[];

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages = () => this.apiService.get<Message[]>(`/message/${this.userId}`)
        .subscribe(response => {
            this.messages = response.body;
        })
}
