import { Sequelize } from "sequelize";
import db from "../database/db.js";

const EntradaModel = db.define('entrada', {
    Id_Entrada: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Dcp_Entrada: {
        type: Sequelize.STRING(10)
    },
    Fec_Entrada: {
        type: Sequelize.DATE
    },
    Ori_Entrada: {
        type: Sequelize.STRING(100)
    },
    Des_Entrada: {
        type: Sequelize.STRING(100)
    },
    Val_Unitario: {
        type: Sequelize.INTEGER
    },
    Val_Total: {
        type: Sequelize.INTEGER
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
