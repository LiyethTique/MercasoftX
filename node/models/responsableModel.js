import db from "../database/db.js";
import {DataTypes} from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Responsable: {
        type: DataTypes.STRING(100)
    },
    Cor_Responsable: {
        type: DataTypes.STRING(100)
    },
    Tel_Responsable: {
        type: DataTypes.STRING(15)
    },
    Tip_Responsable: {
        type: DataTypes.STRING(50)
    },
    Tip_Genero: {
        type: DataTypes.STRING(10)
    }
}, {
    freezeTableName: true
});


export default ResponsableModel