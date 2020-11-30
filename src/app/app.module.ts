import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import RegisterComponent from './register/register.component';
import HomeComponent from './home/home.component';
import {ErrorInterceptorProvider} from './service/error.interceptor.service';
import {AlertifyService} from './service/alertify.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MembersComponent} from './members/members.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './list/lists.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {NotFoundComponent} from './errorPages/not-found/not-found.component';
import {ApiService} from './service/api.service';
import {MemberCardComponent} from './members/components/member-card/member-card.component';
import {JwtInterceptorProvider} from './service/jwt.interceptor';
import {MemberDetailComponent} from './members/components/member-detail/member-detail.component';
import {MemberEditComponent} from './members/components/member-edit/member-edit.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { PhotoEditorComponent } from './members/components/photo-editor/photo-editor.component';
import {FileUploadModule} from 'ng2-file-upload';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        RegisterComponent,
        HomeComponent,
        MembersComponent,
        MessagesComponent,
        ListsComponent,
        NotFoundComponent,
        MemberCardComponent,
        MemberDetailComponent,
        MemberEditComponent,
        PhotoEditorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        TabsModule.forRoot(),
        NgxGalleryModule,
        FileUploadModule,
        PaginationModule.forRoot(),
        ButtonsModule.forRoot()
    ],
    providers: [
        AuthService,
        ErrorInterceptorProvider,
        AlertifyService,
        ApiService,
        JwtInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
