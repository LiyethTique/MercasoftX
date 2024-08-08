import db from "../database/db.js";
import {DataTypes} from "sequelize";

const UnidadModel = db.define('unidad', {
    Id_Unidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Unidad: {
        type: DataTypes.STRING(100)
    }
}, {
    freezeTableName: true
});

export default UnidadModel