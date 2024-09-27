import { Sequelize } from "sequelize";
import db from "../database/db.js";

const Venta = db.define('venta', {
    Id_Venta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Venta: {
        type: Sequelize.DATE
    },
    Val_Venta: {
        type: Sequelize.DECIMAL(10, 2)
    },
    Id_Pedido: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

export default Venta;