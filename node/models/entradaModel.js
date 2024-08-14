import db from "../database/db.js";
import { DataTypes } from "sequelize";

const EntradasModel = db.define('Entradas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Fec_Entrada: {
        type: DataTypes.DATE,
        field: 'Fec_Entrada'
    },
    Hor_Entrada: {
        type: DataTypes.TIME,
        field: 'Hor_Entrada'
    },
    Id_Unidad: {
        type: DataTypes.INTEGER,
        field: 'Id_Unidad'
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        field: 'Id_Producto'
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        field: 'Id_Responsable'
    },
    Can_Entrada: {
        type: DataTypes.INTEGER,
        field: 'Can_Entrada'
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE,
        field: 'Fec_Vencimiento'
    }
}, {
    freezeTableName: true,
    tableName: 'entradas'
});

export default EntradasModel