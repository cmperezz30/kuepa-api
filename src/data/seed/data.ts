import { bcryptAdapter } from "../../config";


export const seedData = {

    users: [
        {name: 'Carlos Perez', username: 'cperez', password: bcryptAdapter.hash('123456')},
        {name: 'Juan Zapata', username: 'jzapata', password: bcryptAdapter.hash('123456')},
        {name: 'Ernesto Valencia', username: 'evalencia', password: bcryptAdapter.hash('123456'), role: ['MODERATOR']},
    ],

    messages: [
        {content: 'Hola, buenos dias profesor'},
        {content: 'Compañero llegas tarde!'},
    ]


}