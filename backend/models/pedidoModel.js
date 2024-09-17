import { Sequelize } from "sequelize";
import db from "../database/db.js";

const PedidoModel = db.define('pedido', {
    Id_Pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Pedido: {
        type: Sequelize.DATE
    },
    Id_Cliente: {
        type: Sequelize.INTEGER
    },
    Est_Pedido: {
        type: Sequelize.STRING
    },
    Val_Pedido: {
        type: Sequelize.DECIMAL(10, 2)
    }
}, {
    timestamps: false,
    tableName: 'pedido'
});

export default PedidoModel;
