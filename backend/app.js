import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/db.js';
import authRoutes from './routes/authRoutes.js'; // Importar las nuevas rutas de autenticación
import userRoutes from './routes/userRoutes.js'; // Rutas de usuarios

// Se importan todas rutas
import carritoRoutes from './routes/carritoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import entradasRoutes from './routes/entradaRoutes.js';
import pedidoRoutes from './routes/pedidoRouter.js';
import pedidoProductoRoutes from './routes/pedidoProductoRoutes.js';
import productoRoutes from './routes/productoRouter.js';
import responsableRoutes from './routes/responsableRoutes.js';
import trasladoRoutes from './routes/trasladoRoutes.js';
import unidadRoutes from './routes/unidadRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';
import carritoproductoRoutes from './routes/carritoproductoRoutes.js';


import Venta from './models/ventaModel.js'
import Pedido from './models/pedidoModel.js'
import Cliente from './models/clienteModel.js'
import carrito from './models/carritoModel.js';
import Producto from './models/productoModel.js';
import Responsable from './models/responsableModel.js';
import Traslado from './models/trasladoModel.js';
import UserModel from './models/authModel.js';


dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Rutas públicas que no requieren autenticación
app.use('/auth', authRoutes); // Rutas de autenticación

//superAdmin
app.use('/users', userRoutes); // Ruta para gestionar usuarios

// Aplicar el middleware `verifyToken` globalmente a todas las rutas protegidas
app.use('/carrito', carritoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/entrada', entradasRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/pedidoProducto', pedidoProductoRoutes);
app.use('/producto', productoRoutes);
app.use('/responsable', responsableRoutes);
app.use('/traslado', trasladoRoutes);
app.use('/unidad', unidadRoutes);
app.use('/venta', ventaRoutes);
app.use('/carritoproducto', carritoproductoRoutes);

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

Venta.belongsTo(Pedido, { as: 'pedido', foreignKey: 'Id_Pedido' });
Pedido.hasMany(Venta, { as: 'ventas', foreignKey: 'Id_Pedido' });

Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'Id_Cliente' });
Pedido.belongsTo(Cliente, { as: 'cliente', foreignKey: 'Id_Cliente' });

// En tu archivo de configuración de modelos
carrito.belongsTo(Producto, { as: 'producto', foreignKey: 'Id_Producto' });
carrito.belongsTo(Cliente, { as: 'cliente', foreignKey: 'Id_Cliente' });

Traslado.belongsTo(Producto, { as: 'producto', foreignKey: 'Id_Producto' });
Producto.hasMany(Traslado, { as: 'traslados', foreignKey: 'Id_Producto' });

Traslado.belongsTo(Responsable, { as: 'responsable', foreignKey: 'Id_Responsable' });
Responsable.hasMany(Traslado, { as: 'traslados', foreignKey: 'Id_Responsable' });

UserModel.belongsTo(Responsable, { as: 'responsable', foreignKey: 'Id_Responsable' });
Responsable.hasMany(UserModel, { as: 'usuarios', foreignKey: 'Id_Responsable' });

export {Venta, Pedido, Cliente, carrito, Producto, Traslado, Responsable, UserModel }