import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Unidad from './unidadModel.js';
import Producto from './productoModel.js';
import Responsable from './responsableModel.js';


const EntradaModel = db.define('entrada', {
    Id_Entrada: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Dcp_Entrada: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    Fec_Entrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Ori_Entrada: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Des_Entrada: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Val_Unitario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Val_Total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Unidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Unidad,
            key: 'Id_Unidad'
        },
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto'
        },
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Responsable,
            key: 'Id_Responsable'
        },
    },
    Can_Entrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'entrada'
});

export default EntradaModel;
