import {Component, Input, OnInit} from '@angular/core';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';
import {ApiUser, Pagination} from '../types/commonTypes';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
    users: ApiUser[];
    pagination: Pagination;
    page = 1;
    limit = 10;
    gender = null;
    genderList = [
        {value: 2, display: 'Female'},
        {value: 1, display: 'Male'},
        {value: null, display: 'All'}
    ];
    @Input() minAge = 18;
    @Input() maxAge = 150;
    orderBy = 'lastActive';

    private apiServiceInterface: ApiServiceInterface;

    constructor(apiServiceInterface: ApiService) {
        this.apiServiceInterface = apiServiceInterface;
    }

    ngOnInit(): void {
        this.fetchMembers();
    }

    fetchMembers = () =>
        this.apiServiceInterface
            .get<ApiUser[]>(`/users?page=${this.page}&limit=${this.limit}${this.gender ? '&gender=' + this.gender : ''}&minAge=${this.minAge}&maxAge=${this.maxAge}&sortBy=${this.orderBy}`)
            .subscribe(response => {
                this.users = response.body;

                if (response.headers.get('Pagination')) {
                    this.pagination = JSON.parse(response.headers.get('Pagination'));
                }
            });

    switchPage = (event: any) => {
        this.page = event.page;

        this.fetchMembers();
    };

    resetFilters = () => {
        this.gender = null;
        this.minAge = 18;
        this.maxAge = 150;
    };
}
