import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
<<<<<<< HEAD
        host: process.env.DB_HOST,      // Host de la base de datos
        dialect: process.env.DB_DIALECT,// Dialecto de la base de datos, en este caso 'mysql'
        port: process.env.DB_PORT       // Port de la base de datos
    }
);

// Exporta la instancia de Sequelize para que pueda ser utilizada en otros módulos
export default db;
=======
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
);

export default db;
>>>>>>> main
