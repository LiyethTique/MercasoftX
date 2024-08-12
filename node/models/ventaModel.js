const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const VentaModel = db.define('venta', {
  Id_Venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Venta'
  },
  Fec_Venta: {
    type: DataTypes.DATE,
    field: 'Fec_Venta'
  },
  Val_Venta: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'Val_Venta'
  },
  Id_Pedido: {
    type: DataTypes.INTEGER,
    field: 'Id_Pedido'
  }
}, {
  tableName: 'venta',
  timestamps: false
});

module.exports = VentaModel;
