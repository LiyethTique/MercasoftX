import { DataTypes } from 'sequelize';
import db from '../database/db.js'

const usuarioModel =  db.define('usuario', {
    Id_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Con_Usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true // Validación para asegurar que el email tiene el formato correcto
        }

    },
    Password_Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'usuario',
    timestamps: true, // Agrega columnas createdAt y updatedAt por defecto
});

export default usuarioModel;