// app.js

import express from 'express';
import router from './router/routerResponsables.js';
import db from './database/db.js';
import dotenv from 'dotenv';
import logger from './.log/logger.js';  

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/responsables', router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await db.authenticate();
        logger.info('La conexión a la base de datos fue exitosa.');
        await db.sync();
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        logger.error('No se pudo conectar a la base de datos', error);
    }
};

startServer();


// app.use(cors())
// app.use(express.json())
// app.use('/responsables',router)


// try {
// await db.authenticate()
// console.log("Conexión exitosa a la db")
// } catch (error) {
// console.log(`Error de conexión a la db: ${error}`)
// }

// app.get('/', (req, res) => {
// res.send('Hola mundo')
// })
// app.listen(7000, () => {
// console.log('Server Up running in http://localhost:7000')
// })