import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Venta = db.define('venta', {
    Id_Venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Venta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Val_Venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Tip_Cliente: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAT: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'venta',
    timestamps: false
});

export default Venta;
