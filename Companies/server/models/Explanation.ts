// models/Explanation.ts
import { DataTypes } from "sequelize";
import sequelize from "../db";
import Company from "./Company";

const Explanation = sequelize.define(
  "Explanation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    marketSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    innovationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marketCompetition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userFit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industryRelevance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamSizeAndTraction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fundingAndValidation: {
      type: DataTypes.STRING,
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
    modelName: "Explanation",
    /**indexes: [
      { fields: ["marketSize"] }, // Índice en tamaño de mercado
      { fields: ["industryRelevance"] }, // Índice en relevancia de la industria
      { fields: ["companyId"] }, // Índice en la clave foránea de empresa
    ],**/
  }
);

Explanation.belongsTo(Company, { foreignKey: "companyId" });
Explanation.sync();

export default Explanation;
