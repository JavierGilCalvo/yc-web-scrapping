import { Model } from "sequelize";

export interface CustomError extends Error {
  statusCode?: number;
}

export interface CompanyAttributes {
  id?: number;
  name: string;
  industries: string;
  fullDescription: string;
  description: string;
  topInvestors: string;
  lastFundingType: string;
  lastFundingAmount: number;
  lastFundingAmountSymbol: string;
  totalFundingEquity: number;
  totalFundingEquitySymbol: string;
  numberOfEmployees: string;
  headquartersLocation: string;
  competitors: number;
  foundedDate: Date;
  logoUrl?: string; // Añadir logoUrl como opcional
}

export class Company
  extends Model<CompanyAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public industries!: string;
  public fullDescription!: string;
  public description!: string;
  public topInvestors!: string;
  public lastFundingType!: string;
  public lastFundingAmount!: number;
  public lastFundingAmountSymbol!: string;
  public totalFundingEquity!: number;
  public totalFundingEquitySymbol!: string;
  public numberOfEmployees!: string;
  public headquartersLocation!: string;
  public competitors!: number;
  public foundedDate!: Date;
  public logoUrl?: string; // Añadir logoUrl como opcional
}

export interface ScoreAttributes {
  id?: number;
  marketSize: number;
  innovationLevel: number;
  marketCompetition: number;
  userFit: number;
  industryRelevance: number;
  teamSizeAndTraction: number;
  fundingAndValidation: number;
  totalScore: number;
  companyId: number;
}

export class Score extends Model<ScoreAttributes> implements ScoreAttributes {
  public id!: number;
  public marketSize!: number;
  public innovationLevel!: number;
  public marketCompetition!: number;
  public userFit!: number;
  public industryRelevance!: number;
  public teamSizeAndTraction!: number;
  public fundingAndValidation!: number;
  public totalScore!: number;
  public companyId!: number;
}

export interface ExplanationAttributes {
  id?: number;
  marketSize: string;
  innovationLevel: string;
  marketCompetition: string;
  userFit: string;
  industryRelevance: string;
  teamSizeAndTraction: string;
  fundingAndValidation: string;
  companyId: number;
}

export class Explanation
  extends Model<ExplanationAttributes>
  implements ExplanationAttributes
{
  public id!: number;
  public marketSize!: string;
  public innovationLevel!: string;
  public marketCompetition!: string;
  public userFit!: string;
  public industryRelevance!: string;
  public teamSizeAndTraction!: string;
  public fundingAndValidation!: string;
  public companyId!: number;
}

// Define el tipo para los datos de las empresas
export interface CompanyData {
  Name: string;
  Industries: string;
  "Full Description": string;
  Description: string;
  "Top 5 Investors": string;
  "Last Funding Type": string;
  "Last Funding Amount": string;
  "Last Funding Amount Symbol": string;
  "Total Funding Equity": string;
  "Total Funding Equity Symbol": string;
  "Number of Employees": string;
  "Headquarters Location": string;
  Competitors: number;
  "Founded Date": Date;
  "Logo URL"?: string; // Añadir Logo URL como opcional
}

// Define el tipo para los datos de las puntuaciones
export interface ScoreData {
  Name: string;
  "Market Size": number;
  "Innovation Level": number;
  "Market Competition": number;
  "User Fit": number;
  "Industry Relevance": number;
  "Team Size and Traction": number;
  "Funding and Validation": number;
  "Total Score": number;
}

// Define el tipo para los datos de las explicaciones
export interface ExplanationData {
  Name: string;
  "Market Size": string;
  "Innovation Level": string;
  "Market Competition": string;
  "User Fit": string;
  "Industry Relevance": string;
  "Team Size and Traction": string;
  "Funding and Validation": string;
}
