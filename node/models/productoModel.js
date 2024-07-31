import db from "../database/db.js";
import {DataTypes} from "sequelize";
 
const ProductoModel = db.define('producto', {
	
	Nom_Producto: { type: DataTypes.STRING},
	Car_Producto: { type: DataTypes.STRING},
	Pre_Promedio: { type: DataTypes.FLOAT},
	Exi_Producto: { type: DataTypes.CHAR},
	Ima_Producto: { type: DataTypes.STRING},
    Fec_Vencimiento: { type: DataTypes.DATEONLY},
	Pre_Anterior: { type: DataTypes.FLOAT},
	Uni_DeMedida: { type: DataTypes.STRING},
	Pre_Producto: { type: DataTypes.FLOAT}
	

},
{
	freezeTableName:true
}
)
export default ProductoModel