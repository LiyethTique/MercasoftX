const { DataTypes } = require('sequelize');
const db = require('./db'); // Asegúrate de que esta ruta sea correcta

const ResponsableModel = db.define('responsable', {
  Id_Responsable: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Responsable'
  },
  Nom_Responsable: {
    type: DataTypes.STRING(100),
    field: 'Nom_Responsable'
  },
  Cor_Responsable: {
    type: DataTypes.STRING(100),
    field: 'Cor_Responsable'
  },
  Tel_Responsable: {
    type: DataTypes.STRING(15),
    field: 'Tel_Responsable'
  },
  Tip_Responsable: {
    type: DataTypes.STRING(50),
    field: 'Tip_Responsable'
  },
  Tip_Genero: {
    type: DataTypes.STRING(10),
    field: 'Tip_Genero'
  }
}, {
  tableName: 'responsable',
  timestamps: false
});

module.exports = ResponsableModel;
