import { DataTypes } from "sequelize";
import db from '../database/db.js';

const UserModel = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true // Validación para asegurar que el email tiene el formato correcto
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
    timestamps: true, // Agrega columnas createdAt y updatedAt por defecto
    paranoid: true, // Habilita el soporte para "soft deletes" (borrado lógico)
});

export default UserModel;
