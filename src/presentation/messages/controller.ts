import { Request, Response } from "express";
import { SendMessageDto } from "../../domain/dtos/message/send-message.dto";
import { MessageService } from "../services/message.service";
import { CustomError } from "../../domain";



export class MessageController {

    constructor(
        public readonly messageService: MessageService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal Server Error'});
    }

    public getMessages = (req: Request, res: Response) => {

        this.messageService.getMessages()
            .then(messages => res.json(messages))
            .catch(error => this.handleError(error, res))

    }

    public sendMessage = (req: Request, res: Response) => {

        const [error, messageDto] = SendMessageDto.create(req.body);

        if(error) return res.status(400).json({error});

        this.messageService.sendMessage(messageDto!)
            .then(message => res.json(message))
            .catch(error => this.handleError(error, res))
        
    }

}