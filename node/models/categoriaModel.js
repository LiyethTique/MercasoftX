const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const CategoriaModel = db.define('categoria', {
  Id_Categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Categoria'
  },
  Nom_Categoria: {
    type: DataTypes.STRING(100),
    field: 'Nom_Categoria'
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

module.exports = CategoriaModel;
