import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import db from './database/db.js';
import { verifyToken, loginUser, registerUser } from './controllers/AuthController.js';

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

// Importar modelos para asociaciones
import Venta from './models/ventaModel.js';
import Pedido from './models/pedidoModel.js';
import Cliente from './models/clienteModel.js';
import carrito from './models/carritoModel.js';
import Producto from './models/productoModel.js';
import Responsable from './models/responsableModel.js';
import Traslado from './models/trasladoModel.js';

// Carga las variables de entorno antes de conectar a la base de datos
dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta estática para servir imágenes subidas
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Rutas públicas que no requieren autenticación
app.post('/auth/login', loginUser); // Login de usuario
app.post('/auth/register', registerUser); // Registro de usuario

// Rutas protegidas (Puedes aplicar `verifyToken` globalmente si lo necesitas en todas)
// app.use(verifyToken);
app.use('/carrito', carritoRoutes);
app.use('/cliente', clienteRoutes);
app.use('/entrada', entradasRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/pedidoProducto', pedidoProductoRoutes);
app.use('/producto', productoRoutes); // Para subir imagen y manejar productos
app.use('/responsable', responsableRoutes);
app.use('/traslado', trasladoRoutes);
app.use('/unidad', unidadRoutes);
app.use('/venta', ventaRoutes);
app.use('/carritoproducto', carritoproductoRoutes);

// Conexión a la base de datos
try {
  await db.authenticate();
  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error}`);
  process.exit(1); // Detener la aplicación en caso de error
}

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

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export { Venta, Pedido, Cliente, carrito, Producto, Traslado, Responsable };