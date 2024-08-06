import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PedidoProducto = db.define('pedidoproducto', {
    Id_PedidoProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedido',
            key: 'Id_Pedido'
        }
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ind_entrega: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
    tableName: 'pedidoproducto',
    timestamps: true
});

export default PedidoProducto;
