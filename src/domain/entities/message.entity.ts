import { CustomError } from "../errors/custom.error";
import { UserEntity } from "./user.entity";


export class MessageEntity {

    constructor(
        public id: string,
        public content: string,
        public userId: string,
        public createdAt: Date, 
    ){}

    static fromObject( object: { [key:string]: any } ) {

        const {id, _id, content, userId, createdAt} = object;

        if(!_id && !id) throw CustomError.badRequest('Missing id');

        if(!content) throw CustomError.badRequest('Missing content');

        if(!userId) throw CustomError.badRequest('Missing user');

        if(!createdAt) throw CustomError.badRequest('Missing createdAt');

        return new MessageEntity(
            _id || id,
            content,
            userId,        
            createdAt,
        );

    }

}