import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Pedido = db.define('pedido', {
    Id_Pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fec_Pedido: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cliente',
            key: 'Id_Cliente'
        }
    },
    Est_Pedido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Val_Pedido: {
        type: DataTypes.DECIMAL(10, 2),
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
    tableName: 'pedido',
    timestamps: true
});

export default Pedido;
