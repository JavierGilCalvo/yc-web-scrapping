// scripts/seedDatabase.ts
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
import Company from "../models/Company";
import Score from "../models/Score";
import Explanation from "../models/Explanation";
import sequelize from "../db";
import { CompanyData, ScoreData, ExplanationData } from "../types";

// Helper function to parse CSV files
const parseCSV = async <T>(filePath: string): Promise<T[]> => {
  const results: T[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => {
        results.push(data);
        console.log("Data parsed:", data); // Muestra cada línea del CSV parseada
      })
      .on("end", () => {
        console.log("Finished parsing file:", filePath); // Muestra cuando termina el parseo
        resolve(results);
      })
      .on("error", (error: Error) => {
        console.error("Error parsing file:", filePath, error); // Muestra cualquier error
        reject(error);
      });
  });
};

// Seed function to load data into the database
const seedDatabase = async () => {
  try {
    // Synchronize all models with the database
    // await sequelize.sync({ force: true });
    // console.log("Database synced!");

    // File paths
    const companiesFilePath = path.join(
      __dirname,
      "../data/crunchbase_companies.csv"
    );
    console.log(companiesFilePath);
    const scoresFilePath = path.join(
      __dirname,
      "../data/output_puntuaciones.csv"
    );
    console.log(scoresFilePath);
    const explanationsFilePath = path.join(
      __dirname,
      "../data/output_explicaciones.csv"
    );
    console.log(explanationsFilePath);

    // Parse the CSV files
    const companiesData: CompanyData[] = await parseCSV<CompanyData>(
      companiesFilePath
    );
    console.log(`Companies Data: ${companiesData}`);
    const scoresData: ScoreData[] = await parseCSV<ScoreData>(scoresFilePath);
    console.log(`Scores Data: ${scoresData}`);
    const explanationsData: ExplanationData[] = await parseCSV<ExplanationData>(
      explanationsFilePath
    );
    console.log(`Explanations Data: ${explanationsData}`);

    // Seed Companies
    for (const company of companiesData) {
      await Company.create({
        name: company.Name,
        industries: company.Industries,
        fullDescription: company["Full Description"],
        description: company.Description,
        topInvestors: company["Top 5 Investors"],
        lastFundingType: company["Last Funding Type"],
        lastFundingAmount: company["Last Funding Amount"],
        numberOfEmployees: company["Number of Employees"],
        headquartersLocation: company["Headquarters Location"],
        foundedDate: company["Founded Date"],
      });
      console.log(`Inserted company: ${company.Name}`);
    }

    // Seed Scores
    for (const score of scoresData) {
      const company = await Company.findOne({ where: { name: score.Name } });
      if (company) {
        await Score.create({
          marketSize: score["Market Size"],
          innovationLevel: score["Innovation Level"],
          marketCompetition: score["Market Competition"],
          userFit: score["User Fit"],
          industryRelevance: score["Industry Relevance"],
          teamSizeAndTraction: score["Team Size and Traction"],
          fundingAndValidation: score["Funding and Validation"],
          totalScore: score["Total Score"],
          companyId: company.id,
        });
        console.log(`Inserted score: ${score}`);
      }
    }

    // Seed Explanations
    for (const explanation of explanationsData) {
      const company = await Company.findOne({
        where: { name: explanation.Name },
      });
      if (company) {
        await Explanation.create({
          marketSize: explanation["Market Size"],
          innovationLevel: explanation["Innovation Level"],
          marketCompetition: explanation["Market Competition"],
          userFit: explanation["User Fit"],
          industryRelevance: explanation["Industry Relevance"],
          teamSizeAndTraction: explanation["Team Size and Traction"],
          fundingAndValidation: explanation["Funding and Validation"],
          companyId: company.id,
        });
        console.log(`Inserted explanation: ${explanation}`);
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedDatabase();
