import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Area = db.define('area', {
    Id_Area: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom_Area: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'area',
    timestamps: true,  // Activamos timestamps para createdAt y updatedAt
});

export default Area;
