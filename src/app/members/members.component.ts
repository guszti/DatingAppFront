import {Component, OnInit} from '@angular/core';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';
import {ApiUser} from '../types/commonTypes';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
    users: ApiUser[];

    private apiServiceInterface: ApiServiceInterface;

    constructor(apiServiceInterface: ApiService) {
        this.apiServiceInterface = apiServiceInterface;
    }

    ngOnInit(): void {
        this.fetchMembers();
    }

    fetchMembers = () =>
        this.apiServiceInterface
            .get<ApiUser[]>('/users')
            .subscribe((data) => (this.users = data))
}
