import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Unidad = db.define('unidad', {
    Id_Unidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Unidad: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'unidad',
    timestamps: false
});

export default Unidad;
