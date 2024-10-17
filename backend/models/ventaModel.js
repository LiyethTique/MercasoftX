import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Pedido from "./pedidoModel.js";
import Producto from "./productoModel.js";

const Venta = db.define(
  "venta",
  {
    Id_Venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fec_Venta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Val_Venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Tip_Cliente: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Id_Pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "Id_Pedido",
      },
    },
    Id_Producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: "Id_Producto",
      },
    },
  },
  {
    tableName: "venta",
    timestamps: false,
  }
);

export default Venta;
