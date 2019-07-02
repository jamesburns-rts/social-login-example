/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChatTestModule } from '../../../test.module';
import { UserChannelDialogComponent } from '../../../../../../main/webapp/app/entities/user-channel/user-channel-dialog.component';
import { UserChannelService } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.service';
import { UserChannel } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { ChannelService } from '../../../../../../main/webapp/app/entities/channel';
import { MessageService } from '../../../../../../main/webapp/app/entities/message';

describe('Component Tests', () => {

    describe('UserChannel Management Dialog Component', () => {
        let comp: UserChannelDialogComponent;
        let fixture: ComponentFixture<UserChannelDialogComponent>;
        let service: UserChannelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [UserChannelDialogComponent],
                providers: [
                    UserService,
                    ChannelService,
                    MessageService,
                    UserChannelService
                ]
            })
            .overrideTemplate(UserChannelDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserChannelDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserChannelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserChannel(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userChannel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userChannelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserChannel();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userChannel = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userChannelListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
