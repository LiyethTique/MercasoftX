import db from "../database/db.js";
import { DataTypes } from "sequelize";

const VentaModel = db.define('venta', {
    Id_Venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Fec_Venta: {
        type: DataTypes.DATE,
        allowNull: true // Ajusta según sea necesario
    },
    Val_Venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'venta'
});
export default VentaModel;