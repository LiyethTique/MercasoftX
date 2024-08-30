import { DataTypes } from "sequelize";
import db from '../database/db.js';

const UserModel = db.define('usuario', {
    Id_Usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Con_Usuario: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    Password_Usuario: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true, // Si el nombre de la tabla en la base de datos esta en mayuscula logra cambiarla a minuscula
    tableName: 'usuario', // Nombre de la tabla en la base de datos
    timestamps: true, // Agrega columnas createdAt y updatedAt por defecto
    createdAt: 'createdAT', // Mapear la columna createdAt a 'createdAT' en la base de datos
    updatedAt: 'updatedAT', // Mapear la columna updatedAt a 'updatedAT' en la base de datos
    paranoid: true, // Habilita el soporte para "soft deletes" (borrado lógico)
});

export default UserModel;