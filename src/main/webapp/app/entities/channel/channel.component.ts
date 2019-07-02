import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Channel } from './channel.model';
import { ChannelService } from './channel.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-channel',
    templateUrl: './channel.component.html'
})
export class ChannelComponent implements OnInit, OnDestroy {
channels: Channel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private channelService: ChannelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.channelService.query().subscribe(
            (res: HttpResponse<Channel[]>) => {
                this.channels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChannels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Channel) {
        return item.id;
    }
    registerChangeInChannels() {
        this.eventSubscriber = this.eventManager.subscribe('channelListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
