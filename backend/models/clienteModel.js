import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ClienteModel = db.define('cliente', {
    Id_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nom_Cliente: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    },
    Cor_Cliente: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    },
    Tel_Cliente: {
        type: DataTypes.STRING(15),
        allowNull: true // Ajusta según sea necesario
    }
  
}, {
    freezeTableName: true,
    tableName: 'cliente'
});

export default ClienteModel;