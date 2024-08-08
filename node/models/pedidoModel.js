import db from "../database/db.js";
import {DataTypes} from "sequelize";

const PedidoModel = db.define('pedido', {
    Id_Pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Pedido: {
        type: DataTypes.DATEONLY
    },
    Id_Cliente: {
        type: DataTypes.INTEGER
    },
    Est_Pedido: {
        type: DataTypes.STRING(50)
    },
    Val_Pedido: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    freezeTableName: true
});

export default PedidoModel