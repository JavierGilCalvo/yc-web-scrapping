import {
  getAllScores,
  getCompanyScore,
  updateCompanyScore,
} from "../controllers/scoreController";

const express = require("express");

export const scoresRouter = express.Router();

scoresRouter.get("/", getAllScores);

scoresRouter.get("/:id", getCompanyScore);

scoresRouter.put("/:id", updateCompanyScore);
