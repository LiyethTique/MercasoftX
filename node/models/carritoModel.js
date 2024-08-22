import { Sequelize } from "sequelize";
import db from "../database/db.js";

const carritoModel = db.define('carrito', {
    Id_Carrito: {
        type: Sequelize.INTEGER,
        primaryKey: true,
<<<<<<< HEAD
        autoIncrement: true,
        allowNull: false
=======
        autoIncrement: true
>>>>>>> main
    },
    Can_Producto: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'carrito'
});

export default carritoModel;
