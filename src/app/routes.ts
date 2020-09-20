import {Routes} from '@angular/router';
import HomeComponent from './home/home.component';
import {MembersComponent} from './members/members.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './list/lists.component';
import {AuthGuard} from './guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MembersComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
