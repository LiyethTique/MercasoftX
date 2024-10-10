import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Pedido from './pedidoModel.js';
import Producto from './productoModel.js';

const PedidoProducto = db.define('pedidoProducto', {
    Id_PedidoProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'Id_Pedido'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAT: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAT: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'pedidoProducto',
    timestamps: false
});

// Definir la relación muchos-a-muchos entre Pedido y Producto

export default PedidoProducto;
