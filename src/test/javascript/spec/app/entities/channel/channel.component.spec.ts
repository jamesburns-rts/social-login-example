/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChatTestModule } from '../../../test.module';
import { ChannelComponent } from '../../../../../../main/webapp/app/entities/channel/channel.component';
import { ChannelService } from '../../../../../../main/webapp/app/entities/channel/channel.service';
import { Channel } from '../../../../../../main/webapp/app/entities/channel/channel.model';

describe('Component Tests', () => {

    describe('Channel Management Component', () => {
        let comp: ChannelComponent;
        let fixture: ComponentFixture<ChannelComponent>;
        let service: ChannelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatTestModule],
                declarations: [ChannelComponent],
                providers: [
                    ChannelService
                ]
            })
            .overrideTemplate(ChannelComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChannelComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChannelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Channel(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.channels[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
