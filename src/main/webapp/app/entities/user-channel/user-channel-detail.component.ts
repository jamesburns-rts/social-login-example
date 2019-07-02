import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserChannel } from './user-channel.model';
import { UserChannelService } from './user-channel.service';

@Component({
    selector: 'jhi-user-channel-detail',
    templateUrl: './user-channel-detail.component.html'
})
export class UserChannelDetailComponent implements OnInit, OnDestroy {

    userChannel: UserChannel;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userChannelService: UserChannelService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserChannels();
    }

    load(id) {
        this.userChannelService.find(id)
            .subscribe((userChannelResponse: HttpResponse<UserChannel>) => {
                this.userChannel = userChannelResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserChannels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userChannelListModification',
            (response) => this.load(this.userChannel.id)
        );
    }
}
