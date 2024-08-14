import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import db from './database/db.js'
import ventaRoutes from './routes/ventaRoutes.js'
import authRoutes from './routes/routesAuth.js'
import routerTraslados from './routes/trasladosRoutes.js'
// Carga las variables de entorno antes de conectar a la base de datos
dotenv.config({ path: './.env'})
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/venta', ventaRoutes)
app.use('/auth', authRoutes)
app.use('/traslados', routerTraslados)



try {
  await db.authenticate()
  console.log("conexión exitosa a la db")
} catch (error) {
  console.error(`Error de conexión a la db: ${error}`)
  // Aquí puedes manejar el error, por ejemplo, deteniendo la aplicación
  process.exit(1)
}

// Rutas principales
app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
