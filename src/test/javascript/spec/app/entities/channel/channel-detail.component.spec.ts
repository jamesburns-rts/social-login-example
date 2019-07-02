/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ChatTestModule } from '../../../test.module';
import { ChannelDetailComponent } from '../../../../../../main/webapp/app/entities/channel/channel-detail.component';
import { ChannelService } from '../../../../../../main/webapp/app/entities/channel/channel.service';
import { Channel } from '../../../../../../main/webapp/app/entities/channel/channel.model';

describe('Component Tests', () => {

    describe('Channel Management Detail Component', () => {
        let comp: ChannelDetailComponent;
        let fixture: ComponentFixture<ChannelDetailComponent>;
        let service: ChannelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [ChannelDetailComponent],
                providers: [
                    ChannelService
                ]
            })
            .overrideTemplate(ChannelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChannelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChannelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Channel(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.channel).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
