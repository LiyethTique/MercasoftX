import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import db from './database/db.js';
import authRoutes from './routes/authRoutes.js'; // Importar las nuevas rutas de autenticación
import userRoutes from './routes/userRoutes.js'; // Rutas de usuarios

// Se importan todas rutas
import area from './routes/areaRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';
import carritoproductoRoutes from './routes/carritoproductoRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import entradasRoutes from './routes/entradaRoutes.js';
import pedidoRoutes from './routes/pedidoRouter.js';
import pedidoProductoRoutes from './routes/pedidoProductoRoutes.js';
import productoRoutes from './routes/productoRouter.js';
import responsableRoutes from './routes/responsableRoutes.js';
import trasladoRoutes from './routes/trasladoRoutes.js';
import unidadRoutes from './routes/unidadRoutes.js';
import ventaRoutes from './routes/ventaRoutes.js';

// Importar modelos para asociaciones
import Venta from './models/ventaModel.js';
import Pedido from './models/pedidoModel.js';
import Cliente from './models/clienteModel.js';
import carrito from './models/carritoModel.js';
import Producto from './models/productoModel.js';
import Responsable from './models/responsableModel.js';
import Traslado from './models/trasladoModel.js';
import UserModel from './models/authModel.js';


// Carga las variables de entorno antes de conectar a la base de datos
dotenv.config({ path: './.env' });
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para servir imágenes subidas
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Rutas públicas que no requieren autenticación
app.use('/auth', authRoutes); // Rutas de autenticación

//superAdmin
app.use('/users', userRoutes); // Ruta para gestionar usuarios

// Rutas protegidas (Puedes aplicar `verifyToken` globalmente si lo necesitas en todas)
app.use('/area', area);
app.use('/carrito', carritoRoutes);
app.use('/carritoproducto', carritoproductoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/entrada', entradasRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/pedidoProducto', pedidoProductoRoutes);
app.use('/producto', productoRoutes); // Para subir imagen y manejar productos
app.use('/responsable', responsableRoutes);
app.use('/traslado', trasladoRoutes);
app.use('/unidad', unidadRoutes);
app.use('/venta', ventaRoutes);

// Conexión a la base de datos
try {
  await db.authenticate();
  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error}`);
  process.exit(1); // Detener la aplicación en caso de error
}

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Asociaciones entre modelos
Venta.belongsTo(Pedido, { as: 'pedido', foreignKey: 'Id_Pedido' });
Pedido.hasMany(Venta, { as: 'ventas', foreignKey: 'Id_Pedido' });

Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'Id_Cliente' });
Pedido.belongsTo(Cliente, { as: 'cliente', foreignKey: 'Id_Cliente' });

carrito.belongsTo(Producto, { as: 'producto', foreignKey: 'Id_Producto' });
carrito.belongsTo(Cliente, { as: 'cliente', foreignKey: 'Id_Cliente' });

Traslado.belongsTo(Producto, { as: 'producto', foreignKey: 'Id_Producto' });
Producto.hasMany(Traslado, { as: 'traslados', foreignKey: 'Id_Producto' });

Traslado.belongsTo(Responsable, { as: 'responsable', foreignKey: 'Id_Responsable' });
Responsable.hasMany(Traslado, { as: 'traslados', foreignKey: 'Id_Responsable' });


export { Venta, Pedido, Cliente, carrito, Producto, Traslado, Responsable, area, UserModel };