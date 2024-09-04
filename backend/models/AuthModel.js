import { DataTypes } from "sequelize";
import db from '../database/db.js';

const UserModel = db.define('usuario', {
    Id_Usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Cor_Usuario: {
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
    tableName: 'usuario'
});

export default UserModel;
