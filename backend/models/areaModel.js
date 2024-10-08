import { DataTypes } from 'sequelize';
import db from '../database/db.js';

// Definición del modelo Área
const Area = db.define('area', {
    Id_Area: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Area: {
        type: DataTypes.STRING(100),
        allowNull: false // Asegúrate de que este campo no acepte valores nulos
    }
}, {
    tableName: 'area', // Nombre de la tabla en la base de datos
    timestamps: false // Desactiva el registro de timestamps
});

export default Area; // Exporta correctamente el modelo
