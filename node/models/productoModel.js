const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const PedidoProductoModel = db.define('pedidoproducto', {
  Id_PedidoProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_PedidoProducto'
  },
  Id_Pedido: {
    type: DataTypes.INTEGER,
    field: 'Id_Pedido'
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    field: 'Id_Producto'
  },
  Ind_entrega: {
    type: DataTypes.BOOLEAN,
    field: 'Ind_entrega'
  },
  Can_Producto: {
    type: DataTypes.INTEGER,
    field: 'Can_Producto'
  }
}, {
  tableName: 'pedidoproducto',
  timestamps: false
});

module.exports = PedidoProductoModel;
