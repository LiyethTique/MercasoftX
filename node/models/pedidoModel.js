const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const PedidoModel = db.define('pedido', {
  Id_Pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Pedido'
  },
  Fec_Pedido: {
    type: DataTypes.DATE,
    field: 'Fec_Pedido'
  },
  Id_Cliente: {
    type: DataTypes.INTEGER,
    field: 'Id_Cliente'
  },
  Est_Pedido: {
    type: DataTypes.STRING(50),
    field: 'Est_Pedido'
  },
  Val_Pedido: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'Val_Pedido'
  }
}, {
  tableName: 'pedido',
  timestamps: false
});

module.exports = PedidoModel;
