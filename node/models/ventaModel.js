import db from "../database/db.js";
import {DataTypes} from "sequelize";

const VentaModel = db.define('venta', {
    Id_Venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fec_Venta: {
        type: DataTypes.DATEONLY
    },
    Val_Venta: {
        type: DataTypes.DECIMAL(10, 2)
    },
    Id_Pedido: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});


export default VentaModel