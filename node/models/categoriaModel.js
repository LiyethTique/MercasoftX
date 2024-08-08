import db from "../database/db.js";
import {DataTypes} from "sequelize";

const CategoriaModel = db.define('categoria', {
    Id_Categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Categoria: {
        type: DataTypes.STRING(100)
    }
}, {
    freezeTableName: true
});
export default CategoriaModel
