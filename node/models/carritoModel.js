import db from "../database/db.js";
import { DataTypes } from "sequelize";

const carritoModel = db.define('carrito', {
    Id_Carrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'carrito'
});

export default carritoModel;
