import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatSharedModule } from '../../shared';
import { ChatAdminModule } from '../../admin/admin.module';
import {
    UserChannelService,
    UserChannelPopupService,
    UserChannelComponent,
    UserChannelDetailComponent,
    UserChannelDialogComponent,
    UserChannelPopupComponent,
    UserChannelDeletePopupComponent,
    UserChannelDeleteDialogComponent,
    userChannelRoute,
    userChannelPopupRoute,
} from './';

const ENTITY_STATES = [
    ...userChannelRoute,
    ...userChannelPopupRoute,
];

@NgModule({
    imports: [
        ChatSharedModule,
        ChatAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserChannelComponent,
        UserChannelDetailComponent,
        UserChannelDialogComponent,
        UserChannelDeleteDialogComponent,
        UserChannelPopupComponent,
        UserChannelDeletePopupComponent,
    ],
    entryComponents: [
        UserChannelComponent,
        UserChannelDialogComponent,
        UserChannelPopupComponent,
        UserChannelDeleteDialogComponent,
        UserChannelDeletePopupComponent,
    ],
    providers: [
        UserChannelService,
        UserChannelPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatUserChannelModule {}
