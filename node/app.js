<<<<<<< HEAD
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
=======
import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import db from './database/db.js'

// Se importan todas rutas
import carritoRoutes from './routes/carritoRoutes.js'
import catagoriaRoutes from './routes/categoriaRoutes.js'
import clienteRoutes from './routes/clienteRoutes.js'
import entradasRoutes from './routes/entradaRoutes.js'
import pedidoRoutes from './routes/pedidoRouter.js'
import pedidoProductoRoutes from './routes/pedidoProductoRoutes.js'
import productoRoutes from './routes/productoRouter.js'
import responsableRoutes from './routes/responsableRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import trasladoRoutes from './routes/trasladoRoutes.js'
import unidadRoutes from './routes/unidadRoutes.js'
import ventaRoutes from './routes/ventaRoutes.js'
>>>>>>> main

// Carga las variables de entorno antes de conectar a la base de datos
dotenv.config({ path: './.env'})
const app = express();
<<<<<<< HEAD
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
=======
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/carrito', carritoRoutes)
app.use('/categoria', catagoriaRoutes)
app.use('/cliente', clienteRoutes)
app.use('/entrada', entradasRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/pedidoProducto', pedidoProductoRoutes)
app.use('/producto', productoRoutes)
app.use('/responsable', responsableRoutes)
app.use('/auth', authRoutes)
app.use('/traslado', trasladoRoutes)
app.use('/unidad', unidadRoutes)
app.use('/venta', ventaRoutes)
>>>>>>> main

try {
  await db.authenticate()
  console.log("conexión exitosa a la db")
} catch (error) {
  console.error(`Error de conexión a la db: ${error}`)
  // Aquí puedes manejar el error, por ejemplo, deteniendo la aplicación
  process.exit(1)
}

<<<<<<< HEAD
// // Rutas principales
// app.get('/', (req, res) => {
//   res.send('Hola Mundo')
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
=======
// Rutas principales
app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
>>>>>>> main
})