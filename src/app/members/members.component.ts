import {Component, OnInit} from '@angular/core';
import {MembersComponentInterface} from './MembersComponentInterface';
import {ApiServiceInterface} from '../service/ApiServiceInterface';
import {ApiService} from '../service/api.service';
import {ApiUser} from '../types/commonTypes';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements MembersComponentInterface, OnInit {
    members: ApiUser[];

    private apiServiceInterface: ApiServiceInterface;

    constructor(apiServiceInterface: ApiService) {
        this.apiServiceInterface = apiServiceInterface;
    }

    ngOnInit() {
        this.fetchMembers();
    }

    fetchMembers = () => this.apiServiceInterface.get<ApiUser[]>('/users')
        .subscribe(data => this.members = data);
}
