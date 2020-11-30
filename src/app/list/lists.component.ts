import {Component, OnInit} from '@angular/core';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';
import {ApiUser} from '../types/commonTypes';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    members: Partial<ApiUser>[];
    predicate = 'liked';

    private apiService: ApiServiceInterface;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.loadLikes();
    }

    loadLikes = () => {
        this.apiService.get<ApiUser[]>(`/userlike?predicate=${this.predicate}`).subscribe(response => this.members = response.body);
    };
}
