import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/db.js';
import expressWinston from 'express-winston';
import logger from './middleware/logger.js';

// Importa los routers
import routerEntradas from './router/routerEntrada.js';
import routerCarrito from './router/routerCarrito.js';
import routerCategoria from './router/routerCategoria.js';
import routerCliente from './router/routerCliente.js';
import routerPedido from './router/routerPedido.js';
import routerPedidoProducto from './router/routerPedidoProducto.js';
import routerProducto from './router/routerProducto.js';
import routerResponsable from './router/routerResponsable.js';
import routerTraslado from './router/routerTraslado.js';
import routerUnidad from './router/routerUnidad.js';
import routerVenta from './router/routerVenta.js';


dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 3000;


// Middleware para parsear JSON
app.use(cors());
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

try {
  await db.authenticate()
  console.log("conexión exitosa a la db")
} catch (error) {
  console.error(`Error de conexión a la db: ${error}`)
  // Aquí puedes manejar el error, por ejemplo, deteniendo la aplicación
  process.exit(1)
}

// // Rutas principales
// app.get('/', (req, res) => {
//   res.send('Hola Mundo')
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})