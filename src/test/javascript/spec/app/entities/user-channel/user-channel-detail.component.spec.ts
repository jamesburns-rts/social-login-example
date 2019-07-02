/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ChatTestModule } from '../../../test.module';
import { UserChannelDetailComponent } from '../../../../../../main/webapp/app/entities/user-channel/user-channel-detail.component';
import { UserChannelService } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.service';
import { UserChannel } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.model';

describe('Component Tests', () => {

    describe('UserChannel Management Detail Component', () => {
        let comp: UserChannelDetailComponent;
        let fixture: ComponentFixture<UserChannelDetailComponent>;
        let service: UserChannelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [UserChannelDetailComponent],
                providers: [
                    UserChannelService
                ]
            })
            .overrideTemplate(UserChannelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserChannelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserChannelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserChannel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userChannel).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
