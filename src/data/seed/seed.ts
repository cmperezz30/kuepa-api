import { envs } from "../../config";
import { MessageModel } from "../mongo/models/message.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })
    await main();

    await MongoDatabase.disconnect();
})();

async function main(){
    //Borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        MessageModel.deleteMany(),
    ]);

    //Crear Usuarios
    const users = await UserModel.insertMany(seedData.users);

    //Crear mensajes
    const messages = await MessageModel.insertMany(
        seedData.messages.map((message, index)=>{
            return {
                ...message,
                user: users[index]._id
            }
        })
    );

}