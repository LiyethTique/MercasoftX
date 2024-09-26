
import { Sequelize } from "sequelize";
import db from "../database/db.js";

const Area = db.define('area', {
  Id_Area: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom_Area: {
    type: Sequelize.STRING(100)
  }
},{
    timestamps: false
});

export default Area;

import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Area = db.define('area', {
    Id_Area: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nom_Area: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'area',
    timestamps: false
});

export default Area;
