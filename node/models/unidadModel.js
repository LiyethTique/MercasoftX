import db from "../database/db.js";
import { DataTypes } from "sequelize";

const UnidadModel = db.define('unidad', {
    Id_Unidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nom_Unidad: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'unidad'
});

export default UnidadModel;