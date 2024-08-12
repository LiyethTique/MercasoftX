import db from "../database/db.js";  
import { DataTypes } from "sequelize"; 

const TrasladosModel = db.define('traslado', {
  Id_Traslado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Traslado'
  },
  Traslado: {
    type: DataTypes.DATE,
    field: 'Traslado'
  },
  Des_Traslado: {
    type: DataTypes.STRING,
    field: 'Des_Traslado'
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    field: 'Id_Producto'
  },
  Can_Producto: {
    type: DataTypes.INTEGER,
    field: 'Can_Producto'
  },
  Val_Unitario: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'Val_Unitario'
  },
  Val_Traslado: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'Val_Traslado'
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    field: 'Id_Responsable'
  }
}, {
  tableName: 'traslado',
  timestamps: false,
  freezeTableName: true,
  
});


export default  TrasladosModel;
