import {
  getAllExplanations,
  getCompanyExplanation,
  updateCompanyExplanation,
} from "../controllers/explanationController";

const express = require("express");

export const explanationsRouter = express.Router();

explanationsRouter.get("/", getAllExplanations);

explanationsRouter.get("/:id", getCompanyExplanation);

explanationsRouter.put("/:id", updateCompanyExplanation);
