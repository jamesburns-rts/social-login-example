import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserChannel } from './user-channel.model';
import { UserChannelPopupService } from './user-channel-popup.service';
import { UserChannelService } from './user-channel.service';

@Component({
    selector: 'jhi-user-channel-delete-dialog',
    templateUrl: './user-channel-delete-dialog.component.html'
})
export class UserChannelDeleteDialogComponent {

    userChannel: UserChannel;

    constructor(
        private userChannelService: UserChannelService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userChannelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userChannelListModification',
                content: 'Deleted an userChannel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-channel-delete-popup',
    template: ''
})
export class UserChannelDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userChannelPopupService: UserChannelPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userChannelPopupService
                .open(UserChannelDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
