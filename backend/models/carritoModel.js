import { Sequelize } from "sequelize";
import db from "../database/db.js";

const CarritoModel = db.define('carrito', {
    Id_Carrito: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Can_Producto: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'carrito'
});

export default CarritoModel;
