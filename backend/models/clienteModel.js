import { DataTypes } from "sequelize";
import  sequelize  from "../database/db.js"; // Asegúrate de que la ruta sea correcta

const ClientesModel = sequelize.define("cliente", {
    Id_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Cor_Cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tel_Cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dir_Cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tip_Cliente: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // Si deseas incluir campos de creación y actualización
    tableName: 'cliente'
});

export default ClientesModel;
