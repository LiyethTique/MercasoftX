import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Producto from './productoModel.js';
import Cliente from './clienteModel.js'

const Carrito = db.define('carrito', {
    Id_Carrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto'
        }
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Puede ser nulo
        references: {
            model: Cliente,
            key: 'Id_Cliente'
        }
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'carrito',
    timestamps: true  // Para manejar createdAt y updatedAt
});


export default Carrito;