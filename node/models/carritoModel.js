import db from "../database/db.js";
import {DataTypes} from "sequelize";

const CarritoModel = db.define('carrito', {
    Id_Carrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Can_Producto: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});
export default CarritoModel