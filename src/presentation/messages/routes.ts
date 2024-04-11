import { Router } from "express";
import { MessageController } from "./controller";
import { MessageService } from "../services/message.service";
import { AuthMiddleware } from "../middleware/auth.middleware";




export class MessageRoutes {

    static get routes(){

        const router = Router();

        const messageService = new MessageService();

        const messageController = new MessageController(messageService);

        router.get('/', messageController.getMessages);
        router.post('/', [AuthMiddleware.validateJwt],messageController.sendMessage);

        return router;

    }

}