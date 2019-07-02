import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatSharedModule } from '../../shared';
import {
    ChannelService,
    ChannelPopupService,
    ChannelComponent,
    ChannelDetailComponent,
    ChannelDialogComponent,
    ChannelPopupComponent,
    ChannelDeletePopupComponent,
    ChannelDeleteDialogComponent,
    channelRoute,
    channelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...channelRoute,
    ...channelPopupRoute,
];

@NgModule({
    imports: [
        ChatSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChannelComponent,
        ChannelDetailComponent,
        ChannelDialogComponent,
        ChannelDeleteDialogComponent,
        ChannelPopupComponent,
        ChannelDeletePopupComponent,
    ],
    entryComponents: [
        ChannelComponent,
        ChannelDialogComponent,
        ChannelPopupComponent,
        ChannelDeleteDialogComponent,
        ChannelDeletePopupComponent,
    ],
    providers: [
        ChannelService,
        ChannelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatChannelModule {}
