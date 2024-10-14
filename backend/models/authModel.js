// models/authModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // tu configuración de base de datos

const UserModel = sequelize.define('usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Cor_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Nuevos campos para la recuperación de contraseña
  ResetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ResetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

export default UserModel;
