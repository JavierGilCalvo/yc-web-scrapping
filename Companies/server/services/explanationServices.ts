import Explanation from "../models/Explanation";

/**
 * Retrieves all companies from the database.
 *
 * @function getAllExplanationsService
 * @returns {Promise<Explanation[]>} - A promise that resolves to an array of all companies.
 */
export const getAllExplanationsService = async () => {
  const allTheExplanations = await Explanation.findAll();
  return allTheExplanations;
};

/**
 * Retrieves a specific company by its ID from the database.
 *
 * @function getCompanyExplanationService
 * @param {string} companyIdToFind - The ID of the company to find.
 * @returns {Promise<Company | null>} - A promise that resolves to the company object if found, or null if not found.
 */
export const getCompanyExplanationService = async (companyIdToFind: number) => {
  const explanationToFind = await Explanation.findOne({
    where: {
      companyId: companyIdToFind,
    },
  });
  return explanationToFind;
};

/**
 * Updates a company in the database by its ID.
 *
 * @function updateCompanyExplanationService
 * @param {object} fields - An object containing the fields to be updated.
 * @param {string} id - The ID of the company to update.
 * @returns {Promise<void>} - A promise that resolves when the company is updated.
 *
 * This function filters out fields that are undefined, null, or empty strings, and only updates the valid fields in the database.
 */
// @ts-ignore
export const updateCompanyExplanationService = async (fields, id) => {
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
  await Explanation.update(updatingObject, {
    where: {
      id,
    },
  });
};
