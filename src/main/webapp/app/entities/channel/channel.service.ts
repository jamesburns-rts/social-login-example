import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Channel } from './channel.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Channel>;

@Injectable()
export class ChannelService {

    private resourceUrl =  SERVER_API_URL + 'api/channels';

    constructor(private http: HttpClient) { }

    create(channel: Channel): Observable<EntityResponseType> {
        const copy = this.convert(channel);
        return this.http.post<Channel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(channel: Channel): Observable<EntityResponseType> {
        const copy = this.convert(channel);
        return this.http.put<Channel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Channel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Channel[]>> {
        const options = createRequestOption(req);
        return this.http.get<Channel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Channel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Channel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Channel[]>): HttpResponse<Channel[]> {
        const jsonResponse: Channel[] = res.body;
        const body: Channel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Channel.
     */
    private convertItemFromServer(channel: Channel): Channel {
        const copy: Channel = Object.assign({}, channel);
        return copy;
    }

    /**
     * Convert a Channel to a JSON which can be sent to the server.
     */
    private convert(channel: Channel): Channel {
        const copy: Channel = Object.assign({}, channel);
        return copy;
    }
}
