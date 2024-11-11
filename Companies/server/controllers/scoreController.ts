import { Response, Request, NextFunction } from "express";
import { CustomError } from "../types";
import {
  getAllScoresService,
  getCompanyScoreService,
  updateCompanyScoreService,
} from "../services/scoreServices";

/**
 * Retrieves all companies from the database.
 *
 * @function getAllScores
 * @param {Request} req - The Express request object, which may contain user information.
 * @param {Response} res - The Express response object, used to send the retrieved companies as a response.
 * @param {NextFunction} next - The next middleware function in the Express stack, used for error handling.
 * @returns {Promise<void>} - Sends a JSON response with the list of all companies or passes the error to the next middleware.
 */
export const getAllScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;

    const { allTheScores, totalPages } = await getAllScoresService(page, limit);
    return res.status(200).json({ allTheScores, totalPages });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a specific company by its ID.
 *
 * @function getCompanyScore
 * @param {Request} req - The Express request object, containing the ID of the company in `req.params.id`.
 * @param {Response} res - The Express response object, used to send the found company as a response.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a JSON response with the company data or passes an error if not found.
 */
export const getCompanyScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companyIdToFind = parseInt(req.params.id);
  try {
    const companyScoreToFind = await getCompanyScoreService(companyIdToFind);

    if (!companyScoreToFind) {
      const error: CustomError = new Error("No company Found");
      error.statusCode = 404;
      next(error);
    }

    return res.status(200).json(companyScoreToFind);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing company with new data.
 *
 * @function updateCompanyScore
 * @param {Request} req - The Express request object, containing the company's updated details in `req.body` and the company ID in `req.params.id`.
 * @param {Response} res - The Express response object, used to send a confirmation message that the company was updated.
 * @param {NextFunction} next - The next middleware function for error handling.
 * @returns {Promise<void>} - Sends a 200 status with a confirmation message or passes an error to the next middleware.
 */
export const updateCompanyScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateCompanyScoreService(req.body, req.params.id);
    return res.status(200).json({
      message: "company Updated",
    });
  } catch (error) {
    next(error);
  }
};
