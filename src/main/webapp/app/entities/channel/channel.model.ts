import { BaseEntity } from './../../shared';

export class Channel implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
