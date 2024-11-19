// models/Score.ts
import { DataTypes } from "sequelize";
import sequelize from "../db";
import Company from "./Company";

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    marketSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    innovationLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marketCompetition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userFit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    industryRelevance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamSizeAndTraction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fundingAndValidation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Company,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    modelName: "Score",
    /**  indexes: [
      { fields: ["marketSize"] }, // Índice en tamaño de mercado
      { fields: ["innovationLevel"] }, // Índice en nivel de innovación
      { fields: ["companyId"] }, // Índice en la clave foránea de empresa
    ],*/
  }
);

Score.belongsTo(Company, { foreignKey: "companyId" });
Score.sync();

export default Score;
