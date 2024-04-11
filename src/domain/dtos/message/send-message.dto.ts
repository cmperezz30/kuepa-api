
export class SendMessageDto {


    private constructor(
        public content: string,
        public userId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, SendMessageDto?] {

        const {content, userId} = object;

        if(!content) return ['Missing content'];

        if(content.length < 1) return ['Content must have at least one character'];

        if(!userId) return ['Missing user'];

       

        return [undefined, new SendMessageDto(content, userId)];
    }

}