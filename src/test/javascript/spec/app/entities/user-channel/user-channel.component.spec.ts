/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatTestModule } from '../../../test.module';
import { UserChannelComponent } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.component';
import { UserChannelService } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.service';
import { UserChannel } from '../../../../../../main/webapp/app/entities/user-channel/user-channel.model';

describe('Component Tests', () => {

    describe('UserChannel Management Component', () => {
        let comp: UserChannelComponent;
        let fixture: ComponentFixture<UserChannelComponent>;
        let service: UserChannelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [UserChannelComponent],
                providers: [
                    UserChannelService
                ]
            })
            .overrideTemplate(UserChannelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserChannelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserChannelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserChannel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userChannels[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
