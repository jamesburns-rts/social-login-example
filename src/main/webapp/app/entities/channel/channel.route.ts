import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChannelComponent } from './channel.component';
import { ChannelDetailComponent } from './channel-detail.component';
import { ChannelPopupComponent } from './channel-dialog.component';
import { ChannelDeletePopupComponent } from './channel-delete-dialog.component';

export const channelRoute: Routes = [
    {
        path: 'channel',
        component: ChannelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.channel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'channel/:id',
        component: ChannelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.channel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const channelPopupRoute: Routes = [
    {
        path: 'channel-new',
        component: ChannelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.channel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'channel/:id/edit',
        component: ChannelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.channel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'channel/:id/delete',
        component: ChannelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'chatApp.channel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
