import db from "../database/db.js";
import {DataTypes} from "sequelize";
 
const ProductoModel = db.define('producto', {
    Id_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Producto: {
        type: DataTypes.STRING(100)
    },
    Car_Producto: {
        type: DataTypes.STRING(255)
    },
    Pre_Promedio: {
        type: DataTypes.DECIMAL(10, 2)
    },
    Exi_Producto: {
        type: DataTypes.INTEGER
    },
    Ima_Producto: {
        type: DataTypes.STRING(255)
    },
    Fec_Vencimiento: {
        type: DataTypes.DATEONLY
    },
    Id_Categoria: {
        type: DataTypes.INTEGER
    },
    Pre_Anterior: {
        type: DataTypes.DECIMAL(10, 2)
    },
    Uni_DeMedida: {
        type: DataTypes.STRING(50)
    },
    Pre_Producto: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    freezeTableName: true
});
export default ProductoModel