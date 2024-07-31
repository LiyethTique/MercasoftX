import express from 'express'
import cors from 'cors'

import db from './database/db.js'
import productoRoutes from './routes/routerProductos.js'
import clienteRoutes from './routes/routerClientes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/producto', productoRoutes)
app.use('/cliente', clienteRoutes)

//nuevo
app.use('/public/uploads/', express.static('public/uploads/'))

try {
	await db.authenticate()
	console.log("Conexión Exitosa a la db")
} catch (error) {
	console.log("Error de Conexión a la db: ${error}")
}
app.get('/',(req, res) => {
	res.send('Hola Mundo')
} )

app.listen(8000, () => {     
	console.log('server Up running in http://localhost:8000')
})







