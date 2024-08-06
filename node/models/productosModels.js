import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Producto = db.define('producto', {
    Id_Producto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom_Producto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Car_Producto: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Pre_Promedio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Exi_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ima_Producto: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Fec_Vencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Id_Categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'Id_Categoria'
        }
    },
    Pre_Anterior: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Uni_DeMedida: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Pre_Producto: {
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
    tableName: 'producto',
    timestamps: true
});

export default Producto;
