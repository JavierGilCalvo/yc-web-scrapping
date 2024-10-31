import { Response, Request, NextFunction } from "express";
import { errorHandler } from "./errorHandler";
import { companyRouter } from "./routers/companyRouter";
import { explanationsRouter } from "./routers/explanationsRouter";
import { scoresRouter } from "./routers/scoresRouter";

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 1001;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello worlds!");
});

// Tasks Router
app.use("/companies", companyRouter);

app.use("/explanations", explanationsRouter);

app.use("/scores", scoresRouter);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

app.use(errorHandler);
