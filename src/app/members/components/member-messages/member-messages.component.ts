import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../../types/commonTypes';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiService} from '../../../service/api.service';
import {NgForm} from '@angular/forms';
import {MessageService} from '../../../service/message.service';

@Component({
    selector: 'app-member-messages',
    templateUrl: './member-messages.component.html',
    styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
    @ViewChild('messageForm') messageForm: NgForm;
    @Input() userId: number;
    @Input() username: string;
    apiService: ApiServiceInterface;
    messages: Message[];
    messageContent: string;

    constructor(apiService: ApiService, public messageService: MessageService) {
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.loadMessages();
    }

    loadMessages = () => this.apiService.get<Message[]>(`/message/${this.userId}`)
        .subscribe(response => {
            this.messages = response.body;
        });

    sendMessage = () => this.messageService.sendMessage(this.userId, this.messageContent)
        .then(() => this.messageForm.reset());
}
