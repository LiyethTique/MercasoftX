const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const ClienteModel = db.define('cliente', {
  Id_Cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Cliente'
  },
  Nom_Cliente: {
    type: DataTypes.STRING(100),
    field: 'Nom_Cliente'
  },
  Cor_Cliente: {
    type: DataTypes.STRING(100),
    field: 'Cor_Cliente'
  },
  Tel_Cliente: {
    type: DataTypes.STRING(15),
    field: 'Tel_Cliente'
  },
  Id_Carrito: {
    type: DataTypes.INTEGER,
    field: 'Id_Carrito'
  }
}, {
  tableName: 'cliente',
  timestamps: false
});

module.exports = ClienteModel;
