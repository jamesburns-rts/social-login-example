import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Channel } from './channel.model';
import { ChannelPopupService } from './channel-popup.service';
import { ChannelService } from './channel.service';

@Component({
    selector: 'jhi-channel-dialog',
    templateUrl: './channel-dialog.component.html'
})
export class ChannelDialogComponent implements OnInit {

    channel: Channel;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private channelService: ChannelService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.channel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.channelService.update(this.channel));
        } else {
            this.subscribeToSaveResponse(
                this.channelService.create(this.channel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Channel>>) {
        result.subscribe((res: HttpResponse<Channel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Channel) {
        this.eventManager.broadcast({ name: 'channelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-channel-popup',
    template: ''
})
export class ChannelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private channelPopupService: ChannelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.channelPopupService
                    .open(ChannelDialogComponent as Component, params['id']);
            } else {
                this.channelPopupService
                    .open(ChannelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
