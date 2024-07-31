import { DataTypes } from "sequelize";
import db from "../database/db.js";


const proyectoModel = db.define('responsables', {
    Documento: { type: DataTypes.NUMBER},
    Nombres: { type: DataTypes.STRING },
    Apellidos: { type: DataTypes.STRING },
    Telefono: {type: DataTypes.NUMBER},
    Correo: { type: DataTypes. STRING},
    Tip_responsable: { type: DataTypes.CHAR},
    Genero: { type: DataTypes.CHAR}
})

export default proyectoModel