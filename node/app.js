import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import db from './database/db.js'
import ventaRoutes from './routes/routes.js'
import authRoutes from './routes/routesAuth.js'
//log
const express= require('express');
const app = express();
const port = 3001

//importar rutas
const routes = require('./routes/routes.js')



app.use(cors())
app.use(express.json())
app.use('/venta', ventaRoutes)
app.use('/auth', authRoutes)
//Usar rutas
app.use('/', routes);

app.listen(port, () =>{
    console.log(`Server runningon port ${port}`)
})

dotenv.config({ path: './env/.env'})

try{
    await db.authenticate()
    console.log("conexión exitosa a la db")
    
}catch (error){
    console.log("Error de conexión a la db: ${error}")
}
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.listen(8000, () => {
    console.log('Server Up running in http://localhost:8000')
})