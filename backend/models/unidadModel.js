import { DataTypes } from 'sequelize'; 
import db from '../database/db.js';
import Area from './areaModel.js';
import Responsable from './responsableModel.js';

const Unidad = db.define('unidad', {
    Id_Unidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Area: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ajusta según sea necesario
        references: {
            model: Area,
            key: "Id_Area"
        },
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ajusta según sea necesario
        references: {
            model: Responsable,
            key: "Id_Responsable"
        },
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