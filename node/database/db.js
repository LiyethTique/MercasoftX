import { Sequelize } from "sequelize";
const db = new Sequelize('mercasoftX','root','', {
	host: 'localhost',
	dialect: 'mysql'
})

export default db