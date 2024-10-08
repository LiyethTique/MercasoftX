import { DataTypes } from 'sequelize'; 
import db from "../database/db.js";
import Unidad from './unidadModel.js';
import Producto from './productoModel.js';
import Responsable from './responsableModel.js';

const EntradaModel = db.define('entrada', {
    Id_Entrada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Dcp_Entrada: { // Descripción de la entrada
        type: DataTypes.STRING(100), // varchar(100)
        allowNull: true
    },
    Fec_Entrada: {
        type: DataTypes.DATE
    },
    Ori_Entrada: { // Origen de la entrada
        type: DataTypes.STRING(45), // varchar(45)
        allowNull: true
    },
    Des_Entrada: { // Destino de la entrada
        type: DataTypes.STRING(45), // varchar(45)
        allowNull: true
    },
    Val_Unitario: { // Valor unitario de la entrada
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Val_Total: { // Valor total de la entrada
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Id_Unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unidad,
            key: 'Id_Unidad'}
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
        type: DataTypes.INTEGER
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false,
    tableName: 'entrada'
});

export default EntradaModel;