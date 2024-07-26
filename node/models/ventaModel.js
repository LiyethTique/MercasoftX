import db from "../database/db.js"
import { DataTypes } from "sequelize";

const VentaModel = db.define('venta', {
    Fec_Venta: {type: DataTypes.DATE},
    Can_Venta: {type: DataTypes.NUMBER},
    Val_Venta: {type: DataTypes.NUMBER},
})

export default VentaModel

