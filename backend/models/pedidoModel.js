import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import Cliente from './clienteModel.js'; // Asegúrate de que la ruta sea correcta

const Pedido = db.define('pedido', {
    Id_Pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'Id_Cliente',
        },
    },
    Fec_Pedido: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Est_Pedido: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    Val_Pedido: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    createdAT: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valor por defecto para la fecha de creación
    },
    updatedAT: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valor por defecto para la fecha de actualización
    },
}, {
    tableName: 'pedido',
    timestamps: false, // Cambia a true si quieres que Sequelize maneje createdAt y updatedAt automáticamente
});

// Si deseas establecer la relación con el modelo de Cliente

export default Pedido;
