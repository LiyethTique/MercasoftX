import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Producto from './productoModel.js'; 
import Responsable from './responsableModel.js'; 

const Traslado = db.define('traslado', {
    Id_Traslado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Fec_Traslado: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Dcp_Traslado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Ori_Traslado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Des_Traslado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Uni_DeMedida: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'Id_Producto',
        },
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Val_Unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Responsable,
            key: 'Id_Responsable',
        },
    }
   
}, {
    tableName: 'traslado',
    timestamps: false, 
});

export default Traslado;
