import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import db from './database/db.js'
import { verifyToken, loginUser, registerUser } from './controllers/AuthController.js';

// Se importan todas rutas
import carritoRoutes from './routes/carritoRoutes.js'
import catagoriaRoutes from './routes/categoriaRoutes.js'
import clienteRoutes from './routes/clienteRoutes.js'
import entradasRoutes from './routes/entradaRoutes.js'
import pedidoRoutes from './routes/pedidoRouter.js'
import pedidoProductoRoutes from './routes/pedidoProductoRoutes.js'
import productoRoutes from './routes/productoRouter.js'
import responsableRoutes from './routes/responsableRoutes.js'
import trasladoRoutes from './routes/trasladoRoutes.js'
import unidadRoutes from './routes/unidadRoutes.js'
import ventaRoutes from './routes/ventaRoutes.js'


// Importar modelos para id
import Venta from './models/ventaModel.js'
import Pedido from './models/pedidoModel.js'
import Cliente from './models/clienteModel.js'



// Carga las variables de entorno antes de conectar a la basse de datos
dotenv.config({ path: './.env'})
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// Rutas públicas que no requieren autenticación
app.post('/auth/login', loginUser);  // Login de usuario
app.post('/auth/register', registerUser);  // Registro de usuario



// Aplicar el middleware `verifyToken` globalmente a todas las rutas protegidas
// app.use(verifyToken);
app.use('/carrito', carritoRoutes)
app.use('/categoria', catagoriaRoutes)
app.use('/cliente', clienteRoutes)
app.use('/entrada', entradasRoutes)
app.use('/pedido', pedidoRoutes)
app.use('/pedidoProducto', pedidoProductoRoutes)
app.use('/producto', productoRoutes)
app.use('/responsable', responsableRoutes)
app.use('/traslado', trasladoRoutes)
app.use('/unidad', unidadRoutes)
app.use('/venta', ventaRoutes)



try {
  await db.authenticate();
  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error}`);
  process.exit(1);  // Detener la aplicación en caso de error
}

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// En el modelo o archivo de asociaciones
Venta.belongsTo(Pedido, { as: 'pedido', foreignKey: 'Id_Pedido' });
Pedido.hasMany(Venta, { as: 'ventas', foreignKey: 'Id_Pedido' });

Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'Id_Cliente' });
Pedido.belongsTo(Cliente, { as: 'cliente', foreignKey: 'Id_Cliente' });

export {Venta, Pedido, Cliente }