import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {ApiService} from '../../../service/api.service';
import {AuthServiceInterface} from '../../../service/AuthServiceInterface';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiUser} from '../../../types/commonTypes';
import {NgForm} from '@angular/forms';
import {AlertifyService} from '../../../service/alertify.service';
import {AlertifyServiceInterface} from '../../../service/AlertifyServiceInterface';

@Component({
    selector: 'app-member-edit',
    templateUrl: './member-edit.component.html',
    styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
    @ViewChild('editForm') editForm: NgForm;
    user: ApiUser;

    private authService: AuthServiceInterface;
    private apiService: ApiServiceInterface;
    private alertifyService: AlertifyServiceInterface;

    constructor(authService: AuthService, apiService: ApiService, alertifyService: AlertifyService) {
        this.authService = authService;
        this.apiService = apiService;
        this.alertifyService = alertifyService;
    }

    ngOnInit(): void {
        this.fetchUser();
    }

    fetchUser = () => {
        const id = this.authService.getUserIdFromToken();

        this.apiService.get<ApiUser>(`/users/${id}`).subscribe(user => this.user = user);
    };

    updateMember = () => {
        const id = this.authService.getUserIdFromToken();

        this.apiService.put(`/users/${id}`, this.user).subscribe(() => {
            this.alertifyService.success('User info updated!');
            this.editForm.reset(this.user);
        });
    };
}
