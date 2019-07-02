import { BaseEntity } from './../../shared';

export class UserChannel implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public channelId?: number,
        public lastReadId?: number,
    ) {
    }
}
