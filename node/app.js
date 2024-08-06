import express from 'express';
import dotenv from 'dotenv';
import expressWinston from 'express-winston';
import logger from './middleware/logger.js';
import db from './database/db.js';

// Importa los routers
import routerEntradas from './routes/routesEntrada.js';
import routerCarrito from './routes/routerCarrito.js';
import routerCategoria from './routes/routerCategoria.js';
import routerCliente from './routes/routerCliente.js';
import routerPedido from './routes/routerPedido.js';
import routerPedidoProducto from './routes/routerPedidoProducto.js';
import routerProducto from './routes/routerProducto.js';
import routerResponsable from './routes/routerResponsable.js';
import routerTraslado from './routes/routerTraslado.js';
import routerUnidad from './routes/routerUnidad.js';
import routerVenta from './routes/routerVenta.js';

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para registrar todas las solicitudes
app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
}));

// Uso de rutas modularizadas
app.use('/api/entrada', routerEntradas);
app.use('/api/carrito', routerCarrito);
app.use('/api/categoria', routerCategoria);
app.use('/api/cliente', routerCliente);
app.use('/api/pedido', routerPedido);
app.use('/api/pedido-producto', routerPedidoProducto);
app.use('/api/producto', routerProducto);
app.use('/api/responsable', routerResponsable);
app.use('/api/traslado', routerTraslado);
app.use('/api/unidad', routerUnidad);
app.use('/api/venta', routerVenta);

// Middleware para manejar errores
app.use(expressWinston.errorLogger({
  winstonInstance: logger,
}));

// Middleware de manejo de errores personalizado (opcional)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Inicialización del servidor con prueba de conexión a la base de datos
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Intenta autenticar la conexión a la base de datos
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


// import express from 'express'
// import cors from 'cors'

// import db from './database/db.js'

// import router from './routes/routes.js'

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use('/entradas', router)

// try {
//     await db.authenticate()
//     console.log('Conexion exitosa a la db.')
// } catch (error) {
//     console.error('Error de conexion a la db: ${error}')
// }

// app.get('/', (req, res) =>{
//     res.send('Hola mundo')
// })

// app.listen(3306, () => {
//     console.log('Servidor corriendo en  http://localhost:3306')
// })