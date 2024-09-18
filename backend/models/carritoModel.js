// Ejemplo del modelo Carrito con Id_Cliente opcional
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Carrito = sequelize.define('Carrito', {
    Id_Carrito: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: true // Ahora es opcional
    }
}, {
    tableName: 'carrito',
    timestamps: false
});

export default Carrito;
