import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserChannel } from './user-channel.model';
import { UserChannelPopupService } from './user-channel-popup.service';
import { UserChannelService } from './user-channel.service';
import { User, UserService } from '../../shared';
import { Channel, ChannelService } from '../channel';
import { Message, MessageService } from '../message';

@Component({
    selector: 'jhi-user-channel-dialog',
    templateUrl: './user-channel-dialog.component.html'
})
export class UserChannelDialogComponent implements OnInit {

    userChannel: UserChannel;
    isSaving: boolean;

    users: User[];

    channels: Channel[];

    messages: Message[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userChannelService: UserChannelService,
        private userService: UserService,
        private channelService: ChannelService,
        private messageService: MessageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.channelService.query()
            .subscribe((res: HttpResponse<Channel[]>) => { this.channels = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.messageService.query()
            .subscribe((res: HttpResponse<Message[]>) => { this.messages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userChannel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userChannelService.update(this.userChannel));
        } else {
            this.subscribeToSaveResponse(
                this.userChannelService.create(this.userChannel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserChannel>>) {
        result.subscribe((res: HttpResponse<UserChannel>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserChannel) {
        this.eventManager.broadcast({ name: 'userChannelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackChannelById(index: number, item: Channel) {
        return item.id;
    }

    trackMessageById(index: number, item: Message) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-channel-popup',
    template: ''
})
export class UserChannelPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userChannelPopupService: UserChannelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userChannelPopupService
                    .open(UserChannelDialogComponent as Component, params['id']);
            } else {
                this.userChannelPopupService
                    .open(UserChannelDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
