import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ResponsableModel = db.define('responsable', {
    Id_Responsable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Nom_Responsable: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    },
    Cor_Responsable: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    },
    Tel_Responsable: {
        type: DataTypes.STRING(15),
        allowNull: true // Ajusta según sea necesario
    },
    Tip_Responsable: {
        type: DataTypes.STRING(50),
        allowNull: true // Ajusta según sea necesario
    },
    Tip_Genero: {
        type: DataTypes.STRING(10),
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'responsable'
});

export default ResponsableModel;