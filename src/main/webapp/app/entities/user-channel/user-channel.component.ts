import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserChannel } from './user-channel.model';
import { UserChannelService } from './user-channel.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-channel',
    templateUrl: './user-channel.component.html'
})
export class UserChannelComponent implements OnInit, OnDestroy {
userChannels: UserChannel[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userChannelService: UserChannelService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userChannelService.query().subscribe(
            (res: HttpResponse<UserChannel[]>) => {
                this.userChannels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserChannels();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserChannel) {
        return item.id;
    }
    registerChangeInUserChannels() {
        this.eventSubscriber = this.eventManager.subscribe('userChannelListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
