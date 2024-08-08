import db from "../database/db.js";
import {DataTypes} from "sequelize";

const TrasladoModel = db.define('traslado', {
    Id_Traslado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Traslado: {
        type: DataTypes.DATE
    },
    Des_Traslado: {
        type: DataTypes.STRING(255)
    },
    Id_Producto: {
        type: DataTypes.INTEGER
    },
    Can_Producto: {
        type: DataTypes.INTEGER
    },
    Val_Unitario: {
        type: DataTypes.DECIMAL(10, 2)
    },
    Val_Traslado: {
        type: DataTypes.DECIMAL(10, 2)
    },
    Id_Responsable: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true
});


export default TrasladoModel