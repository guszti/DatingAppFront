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

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        RegisterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        AuthService,
        ErrorInterceptorProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
