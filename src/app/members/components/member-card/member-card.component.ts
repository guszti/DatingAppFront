import {Component, Input, OnInit} from '@angular/core';
import {ApiUser} from '../../../types/commonTypes';
import {Router} from '@angular/router';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
    @Input() user: ApiUser;

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    ngOnInit(): void {
    }

}
