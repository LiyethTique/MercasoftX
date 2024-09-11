import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'; // Asegúrate de tener instalado bcrypt o bcryptjs
import db from '../database/db.js';

const UserModel = db.define('usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cor_Usuario: {
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
});

// Hash de la contraseña antes de guardar el usuario en la base de datos
UserModel.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.Password_Usuario = await bcrypt.hash(user.Password_Usuario, salt);
});

export default UserModel;