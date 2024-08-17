import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // Asegúrate de ajustar la ruta según tu configuración

const Venta = sequelize.define('Venta', {
    Id_Venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Fec_Venta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Val_Venta: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta si esta columna puede ser null
    },
    Can_Venta: {
        type: DataTypes.INTEGER,
        allowNull: true // Ajusta si esta columna puede ser null
    }
}, {
    tableName: 'venta',
    timestamps: false // Si no tienes campos `createdAt` y `updatedAt`
});

export default Venta;
