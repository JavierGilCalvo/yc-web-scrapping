// scripts/seedDatabase.ts
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
import Company from "../models/Company";
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
    await sequelize.sync({ force: true });

    // File paths
    const companiesFilePath = path.join(
      __dirname,
      "../data/crunchbase_companies_processed.csv"
    );

    // Parse the CSV files
    const companiesData: CompanyData[] = await parseCSV<CompanyData>(
      companiesFilePath
    );

    // Seed Companies
    for (const company of companiesData) {
      await Company.create({
        name: company.Name,
        industries: company.Industries,
        fullDescription: company["Full Description"],
        description: company.Description,
        topInvestors: company["Top 5 Investors"],
        lastFundingType: company["Last Funding Type"],
        lastFundingAmount: parseInt(company["Last Funding Amount"]),
        lastFundingAmountSymbol: company["Last Funding Amount Symbol"],
        totalFundingEquity: parseInt(company["Total Funding Equity"]),
        totalFundingEquitySymbol: company["Total Funding Equity Symbol"],
        numberOfEmployees: company["Number of Employees"],
        headquartersLocation: company["Headquarters Location"],
        competitors: company["Competitors"],
        foundedDate: company["Founded Date"],
        logoUrl: company["Logo URL"],
      });
      //console.log(`Inserted company: ${company.Name}`);
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
