import db from "../database/db.js";
import {DataTypes} from "sequelize";
 
const ClienteModel = db.define('cliente', {
	Id_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Cliente: {
        type: DataTypes.STRING(100)
    },
    Cor_Cliente: {
        type: DataTypes.STRING(100)
    },
    Tel_Cliente: {
        type: DataTypes.STRING(15)
    },
    Id_Carrito: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});
	
	
export default ClienteModel