import {Routes} from '@angular/router';
import HomeComponent from './home/home.component';
import {MembersComponent} from './members/members.component';
import {MessagesComponent} from './messages/messages.component';
import {AuthGuard} from './guards/auth.guard';
import {NotFoundComponent} from './errorPages/not-found/not-found.component';
import {MemberDetailComponent} from './members/components/member-detail/member-detail.component';
import {MemberEditComponent} from './members/components/member-edit/member-edit.component';
import {PreventUnsavedChangesGuard} from './guards/prevent-unsaved-changes.guard';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {ListsComponent} from './list/lists.component';
import {AdminGuard} from './guards/admin.guard';

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
            {path: 'members/:id', component: MemberDetailComponent},
            {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
            {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]}
        ]
    },
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
