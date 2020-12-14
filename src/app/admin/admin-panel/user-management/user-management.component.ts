import {Component, OnInit} from '@angular/core';
import {ApiUser} from '../../../types/commonTypes';
import {ApiService} from '../../../service/api.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {RolesModalComponent} from '../../../modals/roles-modal/roles-modal.component';
import {AlertifyService} from '../../../service/alertify.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
    users: Partial<ApiUser>[];
    bsModalRef: BsModalRef;

    constructor(private apiService: ApiService, private modalService: BsModalService, private alertifyService: AlertifyService) {
    }

    ngOnInit(): void {
        this.getUsersWithRoles();
    }

    getUsersWithRoles = () => this.apiService.get<ApiUser[]>('/admin/users-with-roles')
        .subscribe(response => this.users = response.body);

    openModal = (user: Partial<ApiUser>) => {
        const config = {
            class: 'modal-dialog-centered',
            initialState: {
                user,
                roles: this.getRolesArray(user)
            }
        };

        this.bsModalRef = this.modalService.show(RolesModalComponent, config);
        this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
            const rolesToUpdate = {
                roles: [...values.filter(item => item.checked).map(item => item.name)]
            };

            if (rolesToUpdate) {
                this.apiService.post(`/admin/edit-roles/${user.id}?roles=${rolesToUpdate.roles}`, {})
                    .subscribe(() => {
                        user.roles = [...rolesToUpdate.roles];
                        this.alertifyService.success('Roles updated successfully.');
                    });
            }
        });
    };

    getRolesArray = (user) => {
        const roles = [];
        const userRoles = user.roles;
        const availableRoles = [
            {name: 'Admin', value: 'Admin', checked: false},
            {name: 'Moderator', value: 'Moderator', checked: false},
            {name: 'Member', value: 'Member', checked: false}
        ];

        availableRoles.forEach(availableRole => {
            let isMatch = false;

            for (const userRole of userRoles) {
                if (availableRole.name === userRole) {
                    isMatch = true;
                    availableRole.checked = true;
                    roles.push(availableRole);

                    break;
                }
            }

            if (!isMatch) {
                availableRole.checked = false;
                roles.push(availableRole);
            }
        });

        return roles;
    };
}
