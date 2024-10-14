import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Producto from './productoModel.js'; // Asegúrate de que la ruta sea correcta

const CarritoProducto = db.define('carritoProducto', {
    Id_CarritoProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto',
        },
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAT: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAT: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'carritoProducto',
    timestamps: false
});

export default CarritoProducto;