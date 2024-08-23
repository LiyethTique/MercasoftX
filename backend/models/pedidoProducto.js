import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PedidoProductoModel = db.define('pedidoproducto', {
    Id_PedidoProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Ind_entrega: {
        type: DataTypes.TINYINT,
        allowNull: true // Ajusta según sea necesario
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'pedidoproducto'
});


export default PedidoProductoModel;