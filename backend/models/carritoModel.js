import { Sequelize } from "sequelize";
import db from "../database/db.js";

const carrito = db.define('carrito', {
    Id_Carrito: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Producto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Can_Producto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Id_Cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

export default carrito;
