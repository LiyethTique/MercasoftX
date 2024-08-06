import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Traslado = db.define('traslado', {
    Id_Traslado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Traslado: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Des_Traslado: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
            key: 'Id_Producto'
        }
    },
    Can_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Val_Unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Val_Traslado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Id_Responsable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'responsable',
            key: 'Id_Responsable'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'traslado',
    timestamps: true
});

export default Traslado;
