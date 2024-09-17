import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'; // Asegúrate de tener instalado bcryptjs o bcryptjsjs
import db from '../database/db.js';

const UserModel = db.define('usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cor_Usuario: {  // Corregido el nombre de la columna
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, // Validación para asegurar que el email tiene el formato correcto
    },
  },
  Password_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: 'usuario',
  timestamps: true, // Asegura que los timestamps sean manejados correctamente
  createdAt: 'createdAT', // Mapear el nombre correcto de la columna
  updatedAt: 'updatedAT', // Mapear el nombre correcto de la columna
});

// Hash de la contraseña antes de guardar el usuario en la base de datos


export default UserModel;