import Score from "../models/Score";

/**
 * Retrieves all scores from the database.
 *
 * @function getAllScoresService
 * @returns {Promise<Score[]>} - A promise that resolves to an array of all companies.
 */
export const getAllScoresService = async () => {
  const allTheScores = await Score.findAll();
  return allTheScores;
};

/**
 * Retrieves a specific company score by its ID from the database.
 *
 * @function getCompanyScoreService
 * @param {string} companyIdToFind - The ID of the company to find.
 * @returns {Promise<Company | null>} - A promise that resolves to the company object if found, or null if not found.
 */
export const getCompanyScoreService = async (companyIdToFind: number) => {
  const companyScoreToFind = await Score.findOne({
    where: {
      companyId: companyIdToFind,
    },
  });
  return companyScoreToFind;
};

/**
 * Updates a company in the database by its ID.
 *
 * @function updateCompanyScoreService
 * @param {object} fields - An object containing the fields to be updated.
 * @param {string} id - The ID of the company to update.
 * @returns {Promise<void>} - A promise that resolves when the company is updated.
 *
 * This function filters out fields that are undefined, null, or empty strings, and only updates the valid fields in the database.
 */
// @ts-ignore
export const updateCompanyScoreService = async (fields, id) => {
  // We get the name of the fields that have valid values (not undefined, null, or empty string)
  const fieldsToUpdate = Object.keys(fields).filter((field: string) => {
    return (
      fields[field] !== undefined &&
      fields[field] !== null &&
      fields[field] !== ""
    );
  });

  const updatingObject: { [key: string]: any } = {};

  // Build the update object with the valid fields
  fieldsToUpdate.forEach((filteredField: string) => {
    updatingObject[filteredField] = fields[filteredField];
  });

  // Update the company in the database based on the ID
  await Score.update(updatingObject, {
    where: {
      id,
    },
  });
};
