import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from './database/db.js'

// Se importan todas las rutas
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

// Carga las variables de entorno antes de conectar a la base de datos
dotenv.config({ path: './.env'})
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para verificar el token
const VerifyToken = (req, res, next) => {
  console.log('hola esto es un middleware');
  
  // Verificar si el encabezado de autorización está presente
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'No tiene autorización' });
  }

  const token = req.headers.authorization.replace('Bearer ', '').trim();

  // Validar si el token es válido
  try {
    const decoded = jwt.verify(token, process.env.JWT_LLAVE);

    // Si el token es válido, almacenamos la información del usuario decodificada en req.user
    req.user = decoded.user;

    // Permitir que la solicitud continúe
    next();
  } catch (error) {
    // Si el token no es válido, devolvemos un error de autorización
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas protegidas y no protegidas
app.use('/carrito',VerifyToken, carritoRoutes)
app.use('/categoria',VerifyToken, catagoriaRoutes)
app.use('/cliente',VerifyToken, clienteRoutes)
app.use('/entrada', VerifyToken, entradasRoutes)  // Rutas protegidas con VerifyToken
app.use('/pedido', VerifyToken, pedidoRoutes)
app.use('/pedidoProducto', VerifyToken, pedidoProductoRoutes)
app.use('/producto',VerifyToken, productoRoutes)
app.use('/responsable', VerifyToken, responsableRoutes)
app.use('/auth', authRoutes)  // Rutas de autenticación no protegidas
app.use('/traslado',VerifyToken, trasladoRoutes)
app.use('/unidad',VerifyToken, unidadRoutes)
app.use('/venta',VerifyToken, ventaRoutes)

// Conexión a la base de datos
try {
  await db.authenticate()
  console.log("Conexión exitosa a la db")
} catch (error) {
  console.error(`Error de conexión a la db: ${error}`)
  process.exit(1)
}

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})