import {Component, Input, OnInit} from '@angular/core';
import {ApiUser} from '../../../types/commonTypes';

@Component({
    selector: 'app-member-card',
    templateUrl: './member.card.component.html',
    styleUrls: ['./member.card.component.css']
})
export class MemberCardComponent implements OnInit {
    @Input() user: ApiUser;

    constructor() {
    }

    ngOnInit(): void {
    }

}
