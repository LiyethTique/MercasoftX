import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea una nueva instancia de Sequelize
const db = new Sequelize(
    process.env.DB_NAME,    // Nombre de la base de datos
    process.env.DB_USER,    // Usuario de la base de datos
    process.env.DB_PASSWORD,// Contraseña de la base de datos
    {
        host: process.env.DB_HOST,      // Host de la base de datos
        dialect: process.env.DB_DIALECT,// Dialecto de la base de datos, en este caso 'mysql'
        port: process.env.DB_PORT       // Port de la base de datos
    }
);

// Exporta la instancia de Sequelize para que pueda ser utilizada en otros módulos
export default db;