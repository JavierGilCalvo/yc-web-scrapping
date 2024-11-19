import { Response, Request, NextFunction } from "express";
import { CustomError } from "../types";
import Company from "../models/Company";
import {
  deleteCompanyService,
  getAllCompaniesService,
  getCompanyService,
  updateCompanyService,
} from "../services/companyServices";

/**
 * Retrieves all companies from the database.
 *
 * @function getAllCompanies
 * @param {Request} req - The Express request object, which may contain user information.
 * @param {Response} res - The Express response object, used to send the retrieved companies as a response.
 * @param {NextFunction} next - The next middleware function in the Express stack, used for error handling.
 * @returns {Promise<void>} - Sends a JSON response with the list of all companies or passes the error to the next middleware.
 */
export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 30;

    const { allTheCompanies, totalPages } = await getAllCompaniesService(
      page,
      limit
    );
    return res.status(200).json({ allTheCompanies, totalPages });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a specific company by its ID.
 *
 * @function getCompany
 * @param {Request} req - The Express request object, containing the ID of the company in `req.params.id`.
 * @param {Response} res - The Express response object, used to send the found company as a response.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a JSON response with the company data or passes an error if not found.
 */
export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companyIdToFind = parseInt(req.params.id);
  try {
    const companyToFind = await getCompanyService(companyIdToFind);

    if (!companyToFind) {
      const error: CustomError = new Error("No company Found");
      error.statusCode = 404;
      next(error);
    }

    return res.status(200).json(companyToFind);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new company and stores it in the database.
 *
 * @function createCompany
 * @param {Request} req - The Express request object, containing the company's details in `req.body`.
 * @param {Response} res - The Express response object, used to send confirmation of the created company.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a 201 status with a confirmation message or passes an error to the next middleware.
 */
export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    industries,
    fullDescription,
    description,
    topInvestors,
    lastFundingType,
    lastFundingAmount,
    totalFundingEquity,
    numberOfEmployees,
    headquartersLocation,
    competitors,
    foundedDate,
  } = req.body;

  try {
    await Company.create({
      name,
      industries,
      fullDescription,
      description,
      topInvestors,
      lastFundingType,
      lastFundingAmount,
      totalFundingEquity,
      numberOfEmployees,
      headquartersLocation,
      competitors,
      foundedDate,
    });
    res.status(201).json({
      message: "New company created",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing company with new data.
 *
 * @function updateCompany
 * @param {Request} req - The Express request object, containing the company's updated details in `req.body` and the company ID in `req.params.id`.
 * @param {Response} res - The Express response object, used to send a confirmation message that the company was updated.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a 200 status with a confirmation message or passes an error to the next middleware.
 */
export const updateCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateCompanyService(req.body, req.params.id);
    return res.status(200).json({
      message: "company Updated",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a company by its ID.
 *
 * @function deleteCompany
 * @param {Request} req - The Express request object, containing the company ID in `req.params.id`.
 * @param {Response} res - The Express response object, used to send a confirmation message that the company was deleted.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a 200 status with a confirmation message or passes an error to the next middleware.
 */
export const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteCompanyService(req.params.id);
    return res.status(200).json({
      message: "company Deleted",
    });
  } catch (error) {
    next(error);
  }
};
