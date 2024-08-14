import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PedidosModel = db.define('pedido', {
    Id_Pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Fec_Pedido: {
        type: DataTypes.DATE,
        allowNull: true // Si la columna puede ser NULL, de lo contrario, establece en false
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: true // Si la columna puede ser NULL, de lo contrario, establece en false
    },
    Est_Pedido: {
        type: DataTypes.STRING(50),
        allowNull: true // Si la columna puede ser NULL, de lo contrario, establece en false
    },
    Val_Pedido: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Si la columna puede ser NULL, de lo contrario, establece en false
    }
}, {
    freezeTableName: true,
    tableName: 'pedido'
});

export default PedidosModel