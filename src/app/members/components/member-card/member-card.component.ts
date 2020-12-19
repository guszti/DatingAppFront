import {Component, Input, OnInit} from '@angular/core';
import {ApiUser} from '../../../types/commonTypes';
import {Router} from '@angular/router';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiService} from '../../../service/api.service';
import {PresenceService} from '../../../service/presence.service';

@Component({
    selector: 'app-member-card',
    templateUrl: './member-card.component.html',
    styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
    @Input() user: ApiUser;

    private router: Router;
    private apiService: ApiServiceInterface;

    constructor(router: Router, apiService: ApiService, public presenceService: PresenceService) {
        this.router = router;
        this.apiService = apiService;
    }

    ngOnInit(): void {
    }

    likeUser = (id: number) => this.apiService.post(`/userlike/${id}`, {}).subscribe();
}
