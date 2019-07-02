/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ChatTestModule } from '../../../test.module';
import { UserChannelDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-channel/user-channel-delete-dialog.component';
import { UserChannelService } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.service';

describe('Component Tests', () => {

    describe('UserChannel Management Delete Component', () => {
        let comp: UserChannelDeleteDialogComponent;
        let fixture: ComponentFixture<UserChannelDeleteDialogComponent>;
        let service: UserChannelService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [UserChannelDeleteDialogComponent],
                providers: [
                    UserChannelService
                ]
            })
            .overrideTemplate(UserChannelDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserChannelDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserChannelService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
