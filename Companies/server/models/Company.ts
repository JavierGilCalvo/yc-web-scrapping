// models/Company.ts
import { DataTypes } from "sequelize";
import { Company } from "../types";
import sequelize from "../db";

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industries: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    topInvestors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastFundingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastFundingAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfEmployees: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headquartersLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foundedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Company",
    indexes: [
      { fields: ["name"], unique: true }, // Índice único en nombre
      { fields: ["industries"] }, // Índice en industrias
      { fields: ["headquartersLocation"] }, // Índice en ubicación
    ],
  }
);

/* Establecer la relación entre Task y User
Company.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Company.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
});*/

// Sincronizar el modelo con la base de datos
Company.sync(); // Crea la tabla si no existe

export default Company;
