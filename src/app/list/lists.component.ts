import {Component, OnInit} from '@angular/core';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';
import {ApiUser, Pagination} from '../types/commonTypes';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    members: Partial<ApiUser>[];
    predicate = 'liked';
    pagination: Pagination;
    page = 1;
    limit = 10;

    private apiService: ApiServiceInterface;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.loadLikes();
    }

    loadLikes = () => {
        this.apiService.get<ApiUser[]>(`/userlike?page=${this.page}&limit=${this.limit}&predicate=${this.predicate}`)
            .subscribe(response => {
                this.members = response.body;

                if (response.headers.get('Pagination')) {
                    this.pagination = JSON.parse(response.headers.get('Pagination'));
                }
            });
    };

    switchPage = (event: any) => {
        this.page = event.page;

        this.loadLikes();
    };
}
