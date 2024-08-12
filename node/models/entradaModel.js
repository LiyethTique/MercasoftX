const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const EntradaModel = db.define('entrada', {
  Id_Entrada: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Entrada'
  },
  Fec_Entrada: {
    type: DataTypes.DATE,
    field: 'Fec_Entrada'
  },
  Hor_Entrada: {
    type: DataTypes.TIME,
    field: 'Hor_Entrada'
  },
  Id_Unidad: {
    type: DataTypes.INTEGER,
    field: 'Id_Unidad'
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    field: 'Id_Producto'
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    field: 'Id_Responsable'
  },
  Can_Entrada: {
    type: DataTypes.INTEGER,
    field: 'Can_Entrada'
  },
  Fec_Vencimiento: {
    type: DataTypes.DATE,
    field: 'Fec_Vencimiento'
  }
}, {
  tableName: 'entrada',
  timestamps: false
});

module.exports = EntradaModel;
