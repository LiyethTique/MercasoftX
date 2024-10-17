import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Unidad from "./unidadModel.js";

const Producto = db.define(
  "producto",
  {
    Id_Producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nom_Producto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Car_Producto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Exi_Producto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Ima_Producto: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Fec_Vencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Id_Unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Unidad,
        key: "Id_Unidad",
      },
    },
    Uni_DeMedida: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Pre_Producto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "producto",
    timestamps: false,
  }
);

export default Producto;
