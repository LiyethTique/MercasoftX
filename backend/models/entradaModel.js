import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Unidad from './unidadModel.js'
import Responsable from './responsableModel.js'
import Producto from './productoModel.js';


const Entrada = db.define('entrada', {
    Id_Entrada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Entrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Hor_Entrada: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Id_Unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unidad,
            key: 'Id_Unidad'
        }
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto'
        }
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Responsable,
            key: 'Id_Responsable'
        }
    },
    Can_Entrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE,
        allowNull: true
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

// Definir relaciones


export default Entrada;
