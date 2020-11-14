import {Component, Input, OnInit} from '@angular/core';
import {ApiUser, ApiUserPhoto} from '../../../types/commonTypes';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../environments/environment.local';
import {AuthService} from '../../../service/auth.service';
import {AuthServiceInterface} from '../../../service/AuthServiceInterface';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiService} from '../../../service/api.service';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
    @Input() member: ApiUser;

    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    private authService: AuthServiceInterface;
    private apiService: ApiServiceInterface;

    constructor(authService: AuthService, apiService: ApiService) {
        this.authService = authService;
        this.apiService = apiService;
    }

    ngOnInit(): void {
        this.initializeUploader();
    }

    public fileOverBase = (e: any): void => {
        this.hasBaseDropZoneOver = e;
    };

    private initializeUploader = () => {
        this.uploader = new FileUploader({
            url: `${environment.apiUrl}/users/add-photo`,
            authToken: `Bearer ${this.authService.getJwtToken()}`,
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                this.member.photos.push(JSON.parse(response));
            }
        };
    };

    public setPhotoMain = (photo: ApiUserPhoto) => {
        this.apiService.put(`/users/set-main-photo/${photo.id}`).subscribe(() => {
            this.member.mainPhotoUrl = photo.url;
            localStorage.setItem('photoUrl', photo.url);
            this.member.photos.forEach(item =>
                item.id === photo.id ? item.isMain = true : item.isMain = false
            );
        });
    };
}
