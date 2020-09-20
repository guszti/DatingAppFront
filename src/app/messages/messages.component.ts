import {Component} from '@angular/core';
import {MessagesComponentInterface} from './MessagesComponentInterface';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements MessagesComponentInterface {

}
