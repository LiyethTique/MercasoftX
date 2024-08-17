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
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/venta', ventaRoutes)
app.use('/auth', authRoutes)
app.use('/traslados', routerTraslados)

app.get('/login', (req, res) =>{
  res.status(200).json({Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDc5Nzg2OTIxMjE5MjcxOTI3MTI3MzcxOSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.bcMKXyHXwMOGCS1w-v3THEvTT4HW9o4Kde9rh6ZSDtg'})
})

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

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
