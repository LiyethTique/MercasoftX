import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Carrito = db.define('carrito', {
    Id_Carrito: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'carrito',
    timestamps: true
});

export default Carrito;
