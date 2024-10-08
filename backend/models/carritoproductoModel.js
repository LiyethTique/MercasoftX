import { Sequelize } from "sequelize";
import db from "../database/db.js";

const CarritoProductoModel = db.define('carritoproducto', {
    Id_carritoProducto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Carrito: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id_Producto: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'carritoproducto'
});

export default CarritoProductoModel;
