import db from "../database/db.js";
import {DataTypes} from "sequelize";
 
const ClienteModel = db.define('cliente', {
	
	Nom_Cliente: { type: DataTypes.STRING},
	Cor_Cliente: { type: DataTypes.STRING},
	Tel_Cliente: { type: DataTypes.NUMBER}
	

}, {
	freezeTableName: true
});
export default ClienteModel