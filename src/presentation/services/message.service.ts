import { MessageModel } from "../../data/mongo/models/message.model";
import { CustomError } from "../../domain";
import { SendMessageDto } from "../../domain/dtos/message/send-message.dto";
import { WssService } from "./Wss.service";



export class MessageService {

    constructor(
        private readonly wssService = WssService.instance
    ){}

    public async sendMessage(sendMessageDto: SendMessageDto){

        try {
            
            const message = new MessageModel({
                content: sendMessageDto.content,
                user: sendMessageDto.userId,
            })

            await message.save()

            const populated = await message.populate('user')

            this.onNewMessageChanged(populated);
            return populated;

        } catch (error) {
            
            throw CustomError.internalServer('Internal server error');

        }

    }

    public async getMessages(){

        try {
            
            const messages = MessageModel.find().populate('user')

            return messages;

        } catch (error) {
            
            throw CustomError.internalServer('Internal server error');

        }

    }

    private onNewMessageChanged(data: Object){
        this.wssService.sendMessage('on-new-message-changed', data);
    }

}