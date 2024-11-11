// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1001/", // URL base de tu API
});

// Companies Information
export const getCompanies = (page = 1, limit = 15) =>
  api.get("/companies", { params: { page, limit } });
export const getCompanyInfo = (companyId: number) =>
  api.get(`/companies/${companyId}`);

// Scores Information
export const getScores = (page = 1, limit = 15) =>
  api.get("/scores", { params: { page, limit } });
export const getCompanyScore = (companyId: number) =>
  api.get(`/scores/${companyId}`);

// Score Explanations Information
export const getExplanations = (page = 1, limit = 15) =>
  api.get("/explanations", { params: { page, limit } });
export const getCompanyScoreExplanation = (companyId: number) =>
  api.get(`/explanations/${companyId}`);

export default api;
