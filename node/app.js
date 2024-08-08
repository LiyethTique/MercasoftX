import express from 'express';
//import cors from 'cors';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import logger from './middleware/logger.js';
import db from './database/db.js'


import productoRoutes from './routes/routerProductos.js'
import clienteRoutes from './routes/routerClientes.js'

dotenv.config 

const app = express();
app.use(express.json());

app.use(expressWinston.logger({
	winstonInstance: logger,
	meta: true,
	msg: "HTTP {{req.method}} {{req.url}}",
	expressFormat: true,
	colorize: false,
  }));

//app.use(cors())
app.use('/producto', productoRoutes)
app.use('/cliente', clienteRoutes)

app.use(expressWinston.errorLogger({
	winstonInstance: logger,
}));

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		error:process.env.NODE_ENV === 'development' ? err : {}
	});
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    //autenticar la conexión a la BD
    await db.authenticate();
    console.log('La conexión a la base de datos ha sido exitosa.');

    await db.sync();

    // Si la conexión es exitosa, inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    // Si ocurre un error, muestra el mensaje y no inicia el servidor
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

startServer();
   









