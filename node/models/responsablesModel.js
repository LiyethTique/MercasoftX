import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Responsables = db.define('responsables', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Documento: {
        type: DataTypes.INTEGER
    },
    Nombres: {
        type: DataTypes.STRING
    },
    Apellidos: {
        type: DataTypes.STRING
    },
    Telefono: {
        type: DataTypes.INTEGER
    },
    Correo: {
        type: DataTypes.STRING
    },
    Tip_responsable: {
        type: DataTypes.CHAR
    },
    Genero: {
        type: DataTypes.CHAR
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'responsables'
});

export default Responsables;
