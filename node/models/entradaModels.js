import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Entrada = db.define('entrada', {
    Id_Entrada: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fec_Entrada: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Hor_Entrada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Id_Unidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Can_Entrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fec_Vencimiento: {
        type: DataTypes.DATEONLY,
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
    tableName: 'entrada',
    timestamps: true
});

export default Entrada;
