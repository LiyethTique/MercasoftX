import { Sequelize } from "sequelize";
import db from "../database/db.js";

const Categoria = db.define('categoria', {
    Id_Categoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Categoria: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

export default Categoria;
