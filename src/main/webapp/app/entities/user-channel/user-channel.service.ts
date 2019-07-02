import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserChannel } from './user-channel.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserChannel>;

@Injectable()
export class UserChannelService {

    private resourceUrl =  SERVER_API_URL + 'api/user-channels';

    constructor(private http: HttpClient) { }

    create(userChannel: UserChannel): Observable<EntityResponseType> {
        const copy = this.convert(userChannel);
        return this.http.post<UserChannel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userChannel: UserChannel): Observable<EntityResponseType> {
        const copy = this.convert(userChannel);
        return this.http.put<UserChannel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserChannel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserChannel[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserChannel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserChannel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserChannel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserChannel[]>): HttpResponse<UserChannel[]> {
        const jsonResponse: UserChannel[] = res.body;
        const body: UserChannel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserChannel.
     */
    private convertItemFromServer(userChannel: UserChannel): UserChannel {
        const copy: UserChannel = Object.assign({}, userChannel);
        return copy;
    }

    /**
     * Convert a UserChannel to a JSON which can be sent to the server.
     */
    private convert(userChannel: UserChannel): UserChannel {
        const copy: UserChannel = Object.assign({}, userChannel);
        return copy;
    }
}
