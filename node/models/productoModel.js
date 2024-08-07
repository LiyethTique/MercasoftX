import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProductoModel = db.define('producto', {
    Id_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Nom_Producto: {
        type: DataTypes.STRING(100),
        allowNull: true // Ajusta según sea necesario
    },
    Car_Producto: {
        type: DataTypes.STRING(255),
        allowNull: true // Ajusta según sea necesario
    },
    Pre_Promedio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    },
    Exi_Producto: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Ima_Producto: {
        type: DataTypes.STRING(255),
        allowNull: true // Ajusta según sea necesario
    },
    Fec_Vencimiento: {
        type: DataTypes.DATE,
        allowNull: true // Ajusta según sea necesario
    },
    Id_Categoria: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta según sea necesario
    },
    Pre_Anterior: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    },
    Uni_DeMedida: {
        type: DataTypes.STRING(50),
        allowNull: true // Ajusta según sea necesario
    },
    Pre_Producto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true // Ajusta según sea necesario
    }
}, {
    freezeTableName: true,
    tableName: 'producto'
});

export default ProductoModel;