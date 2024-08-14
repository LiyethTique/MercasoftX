import db from "../database/db.js";
import { DataTypes } from "sequelize";

const TrasladoModel = db.define('traslado', {
    Id_Traslado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Fec_Traslado: {
        type: DataTypes.DATE,
        allowNull: true // Ajusta según sea necesario
    },
    Des_Traslado: {
        type: DataTypes.STRING(255),
        allowNull: true // Ajusta según sea necesario
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Val_Unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    },
    Val_Traslado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'traslado'
});

export default TrasladoModel;