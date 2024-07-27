import { Sequelize } from "sequelize";


const db = new Sequelize('proyectomercasoft_x', 'root', '', {
     host: 'localhost',
     dialect: 'mysql'
})
export default db