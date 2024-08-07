import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CategoriaModel = db.define('categoria', {
    Id_Categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Nom_Categoria: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'categoria'
});

export default CategoriaModel;