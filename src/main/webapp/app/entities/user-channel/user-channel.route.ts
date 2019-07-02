import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UserChannelComponent } from './user-channel.component';
import { UserChannelDetailComponent } from './user-channel-detail.component';
import { UserChannelPopupComponent } from './user-channel-dialog.component';
import { UserChannelDeletePopupComponent } from './user-channel-delete-dialog.component';

export const userChannelRoute: Routes = [
    {
        path: 'user-channel',
        component: UserChannelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.userChannel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-channel/:id',
        component: UserChannelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.userChannel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userChannelPopupRoute: Routes = [
    {
        path: 'user-channel-new',
        component: UserChannelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.userChannel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-channel/:id/edit',
        component: UserChannelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.userChannel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-channel/:id/delete',
        component: UserChannelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.userChannel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
