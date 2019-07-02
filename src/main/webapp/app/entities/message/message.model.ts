import { BaseEntity } from './../../shared';

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public content?: string,
        public timestamp?: any,
        public userId?: number,
        public channelId?: number,
    ) {
    }
}
