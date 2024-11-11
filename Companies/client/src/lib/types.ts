export type ScoreList = Score[];

export interface Score {
  id: number;
  marketSize: number;
  innovationLevel: number;
  marketCompetition: number;
  userFit: number;
  industryRelevance: number;
  teamSizeAndTraction: number;
  fundingAndValidation: number;
  totalScore: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export type ExplanationList = Explanation[];

export interface Explanation {
  id: number;
  marketSize: string;
  innovationLevel: string;
  marketCompetition: string;
  userFit: string;
  industryRelevance: string;
  teamSizeAndTraction: string;
  fundingAndValidation: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export type CompanyList = Company[];

export interface Company {
  id: number;
  name: string;
  industries: string;
  fullDescription: string;
  description: string;
  topInvestors: string;
  lastFundingType: string;
  lastFundingAmount: string;
  numberOfEmployees: string;
  headquartersLocation: string;
  foundedDate: string;
  createdAt: string;
  updatedAt: string;
}
