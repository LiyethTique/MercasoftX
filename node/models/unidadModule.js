const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const UnidadModel = db.define('unidad', {
  Id_Unidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Unidad'
  },
  Nom_Unidad: {
    type: DataTypes.STRING(100),
    field: 'Nom_Unidad'
  }
}, {
  tableName: 'unidad',
  timestamps: false
});

module.exports = UnidadModel;
