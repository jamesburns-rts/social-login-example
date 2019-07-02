import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChatMessageModule } from './message/message.module';
import { ChatChannelModule } from './channel/channel.module';
import { ChatUserChannelModule } from './user-channel/user-channel.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ChatMessageModule,
        ChatChannelModule,
        ChatUserChannelModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatEntityModule {}
