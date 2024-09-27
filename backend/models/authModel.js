// models/authModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import ResponsableModel from './responsableModel.js'; // Importa el modelo Responsable

const UserModel = sequelize.define('Usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ResponsableModel, // Hace referencia al modelo Responsable
      key: 'Id_Responsable',   // El campo en Responsable al que se refiere
    },
  },
  Cor_Usuario: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, 
  },
  Password_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'Usuario',
  timestamps: false,
});

// Definir la relación


export default UserModel;