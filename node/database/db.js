import {Sequelize} from "sequelize";

const db = new Sequelize('mercasoft', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db