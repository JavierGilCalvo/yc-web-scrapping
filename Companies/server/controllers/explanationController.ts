import { Response, Request, NextFunction } from "express";
import { CustomError } from "../types";

import {
  getAllExplanationsService,
  getCompanyExplanationService,
  updateCompanyExplanationService,
} from "../services/explanationServices";

/**
 * Retrieves all companies from the database.
 *
 * @function getAllCompanies
 * @param {Request} req - The Express request object, which may contain user information.
 * @param {Response} res - The Express response object, used to send the retrieved companies as a response.
 * @param {NextFunction} next - The next middleware function in the Express stack, used for error handling.
 * @returns {Promise<void>} - Sends a JSON response with the list of all companies or passes the error to the next middleware.
 */
export const getAllExplanations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTheExplanations = await getAllExplanationsService();
    return res.status(200).json(allTheExplanations);
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
export const getCompanyExplanation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companyIdToFind = parseInt(req.params.id);
  try {
    const companyExplanationToFind = await getCompanyExplanationService(
      companyIdToFind
    );

    if (!companyExplanationToFind) {
      const error: CustomError = new Error("No company Found");
      error.statusCode = 404;
      next(error);
    }

    return res.status(200).json(companyExplanationToFind);
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
export const updateCompanyExplanation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateCompanyExplanationService(req.body, req.params.id);
    return res.status(200).json({
      message: "company Explanation Updated",
    });
  } catch (error) {
    next(error);
  }
};
