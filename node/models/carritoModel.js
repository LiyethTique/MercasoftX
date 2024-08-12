const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const CarritoModel = db.define('carrito', {
  Id_Carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Carrito'
  },
  Can_Producto: {
    type: DataTypes.INTEGER,
    field: 'Can_Producto'
  }
}, {
  tableName: 'carrito',
  timestamps: false
});

module.exports = CarritoModel;
