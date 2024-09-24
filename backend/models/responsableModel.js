import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Responsable = db.define('responsable', {
    Id_Responsable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Responsable: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Tel_Responsable: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    Tip_Responsable: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Tip_Genero: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'responsable',
    timestamps: false
});

export default Responsable;
