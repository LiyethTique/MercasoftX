import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Venta = db.define('venta', {
    Id_Venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fec_Venta: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Val_Venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pedido',
            key: 'Id_Pedido'
        }
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
    tableName: 'venta',
    timestamps: true
});

export default Venta;
