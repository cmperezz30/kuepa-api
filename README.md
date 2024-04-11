# Kuepa Platform API

Este proyecto es una API REST para prueba tecnica de Kuepa EduTech la cual utiliza websockets para enviar data a la aplicacion cliente
y para la persistencia de datos fue seleccionado MongoDB y su ORM mongoose.


Cada paso de la configuración se encuentra acontinuacion, por lo que solo es necesario clonar el proyecto y seguir cada paso.


## Instalación y configuracion

1. Clonar el archivo `.env.template` a un archivo llamado `.env` y configurar las variables de entorno.
2. Ejecutar `npm install` para instalar las dependencias.
3. Para usar la base de datos, revisar y configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar el servicio de MongoDB.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo.

