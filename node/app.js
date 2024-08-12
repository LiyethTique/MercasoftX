import express from 'express'
import cors from 'cors'

import db from './database/db.js'
import trasladoRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/traslado', trasladoRoutes)


try{
    await db.authenticate()
    console.log("conexion exitosa a la db")
}catch(error){
    console.log(`error de conexion a la db: ${error}`)    
}

app.get('/',(req,res)=>{
    res.send('hola mundo')
})

app.listen(8000,()=>{
    console.log('server up running in http://localhost:8000')
})