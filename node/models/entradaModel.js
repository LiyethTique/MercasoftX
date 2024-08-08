import db from "../database/db.js";
import {DataTypes} from "sequelize";

const EntradaModel = db.define('entrada', {
    Id_Entrada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Entrada: {
        type: DataTypes.DATEONLY
    },
    Hor_Entrada: {
        type: DataTypes.TIME
    },
    Id_Unidad: {
        type: DataTypes.INTEGER
    },
    Id_Producto: {
        type: DataTypes.INTEGER
    },
    Id_Responsable: {
        type: DataTypes.INTEGER
    },
    Can_Entrada: {
        type: DataTypes.INTEGER
    },
    Fec_Vencimiento: {
        type: DataTypes.DATEONLY
    }
}, {
    freezeTableName: true
});

export default EntradaModel