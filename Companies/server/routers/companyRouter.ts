import {
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController";

const express = require("express");

export const companyRouter = express.Router();

companyRouter.get("/", getAllCompanies);

companyRouter.get("/:id", getCompany);

companyRouter.post("/", createCompany);

companyRouter.put("/:id", updateCompany);

companyRouter.delete("/:id", deleteCompany);
