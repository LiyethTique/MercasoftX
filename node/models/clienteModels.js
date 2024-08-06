import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Cliente = db.define('cliente', {
    Id_Cliente: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom_Cliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Cor_Cliente: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Tel_Cliente: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    Id_Carrito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carrito',
            key: 'Id_Carrito'
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
    tableName: 'cliente',
    timestamps: true
});

export default Cliente;
