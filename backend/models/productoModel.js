import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Producto = db.define('producto', {
    Id_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Producto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Car_Producto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Pre_Promedio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    Exi_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Ima_Producto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Id_Categoria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Pre_Anterior: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    Uni_DeMedida: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Pre_Producto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'producto',
    timestamps: false
});

export default Producto;
