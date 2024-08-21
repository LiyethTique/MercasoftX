import { Sequelize } from "sequelize";
import db from "../database/db.js";

const EntradaModel = db.define('entrada', {
    Id_Entrada: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Entrada: {
        type: Sequelize.DATE
    },
    Hor_Entrada: {
        type: Sequelize.TIME
    },
    Id_Unidad: {
        type: Sequelize.INTEGER
    },
    Id_Producto: {
        type: Sequelize.INTEGER
    },
    Id_Responsable: {
        type: Sequelize.INTEGER
    },
    Can_Entrada: {
        type: Sequelize.INTEGER
    },
    Fec_Vencimiento: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    tableName: 'entrada'
});

export default EntradaModel;
