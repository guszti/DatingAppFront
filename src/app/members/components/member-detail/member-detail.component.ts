import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {ApiServiceInterface} from '../../../service/ApiServiceInterface';
import {ApiUser} from '../../../types/commonTypes';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {PresenceService} from '../../../service/presence.service';
import {MessageService} from '../../../service/message.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
    member: ApiUser;
    galleryImages: NgxGalleryImage[];
    galleryOptions: NgxGalleryOptions[] = [{
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
    }];

    private apiServiceInterface: ApiServiceInterface;
    private activatedRoute: ActivatedRoute;

    constructor(
        apiServiceInterface: ApiService,
        activatedRoute: ActivatedRoute,
        public presenceService: PresenceService,
        public messageService: MessageService
    ) {
        this.apiServiceInterface = apiServiceInterface;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        this.fetchMember();
        this.messageService.createHubConnection(this.member.id, this.member.username);
    }

    ngOnDestroy(): void {
        this.messageService.stopHubConnection();
    }

    getImages = (member: ApiUser) => {
        if (member?.photos) {
            this.galleryImages = member.photos.map(item => ({
                small: item.url,
                medium: item.url,
                big: item.url,
            }));
        }

        return [];
    };

    fetchMember = () => {
        const id = this.activatedRoute.snapshot.paramMap.get('id');

        this.apiServiceInterface
            .get<ApiUser>(`/users/${id}`)
            .subscribe(response => {
                this.member = response.body;

                this.getImages(response.body);
            });
    };
}
