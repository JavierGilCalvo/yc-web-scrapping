import { Sequelize } from "sequelize";

// Configuración de SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Archivo de la base de datos SQLite
});

export default sequelize;
