import express from 'express'
import cors from 'cors'

import db from './database/db.js'
import responseRoutes from './routes/routes.js'
import centerRoutes from './routes/routesCenters.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/responsables',responseRoutes)
app.use('/centers', centerRoutes)

try {
await db.authenticate()
console.log("Conexión exitosa a la db")
} catch (error) {
console.log(`Error de conexión a la db: ${error}`)
}

app.get('/', (req, res) => {
res.send('Hola mundo')
})
app.listen(7000, () => {
console.log('Server Up running in http://localhost:7000')
})