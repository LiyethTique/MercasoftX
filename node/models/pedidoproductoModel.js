import db from "../database/db.js";
import {DataTypes} from "sequelize";

const PedidoProductoModel = db.define('pedidoproducto', {
    Id_PedidoProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Pedido: {
        type: DataTypes.INTEGER
    },
    Id_Producto: {
        type: DataTypes.INTEGER
    },
    Ind_entrega: {
        type: DataTypes.TINYINT
    },
    Can_Producto: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});


export default PedidoProductoModel