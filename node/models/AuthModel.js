import { DataTypes } from "sequelize";
import db from '../database/db.js'

const UserModel = db.define('usuarios', {
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type:DataTypes.STRING, allowNull: false}
})

export default UserModel