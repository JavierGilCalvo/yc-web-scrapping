import Company from "../models/Company";

/**
 * Retrieves all companies from the database.
 *
 * @function getAllCompaniesService
 * @returns {Promise<Company[]>} - A promise that resolves to an array of all companies.
 */
export const getAllCompaniesService = async () => {
  const allTheCompanies = await Company.findAll();
  return allTheCompanies;
};

/**
 * Retrieves a specific company by its ID from the database.
 *
 * @function getCompanyService
 * @param {string} companyIdToFind - The ID of the company to find.
 * @returns {Promise<Company | null>} - A promise that resolves to the company object if found, or null if not found.
 */
export const getCompanyService = async (companyIdToFind: number) => {
  const companyToFind = await Company.findByPk(companyIdToFind);
  return companyToFind;
};

/**
 * Creates a new company in the database.
 *
 * @function createCompanyService
 * @param {object} companyInformation - The information of the company to be created.
 * @returns {Promise<void>} - A promise that resolves when the company is created.
 */
// @ts-ignore
export const createCompanyService = async (companyInformation) => {
  const newCompany = await Company.create(companyInformation);
};

/**
 * Updates a company in the database by its ID.
 *
 * @function updateCompanyService
 * @param {object} fields - An object containing the fields to be updated.
 * @param {string} id - The ID of the company to update.
 * @returns {Promise<void>} - A promise that resolves when the company is updated.
 *
 * This function filters out fields that are undefined, null, or empty strings, and only updates the valid fields in the database.
 */
// @ts-ignore
export const updateCompanyService = async (fields, id) => {
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
  await Company.update(updatingObject, {
    where: {
      id,
    },
  });
};

/**
 * Deletes a company from the database by its ID.
 *
 * @function deleteCompanyService
 * @param {string} companyToDeleteId - The ID of the company to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the company is deleted.
 */
// @ts-ignore
export const deleteCompanyService = async (companyToDeleteId) => {
  await Company.destroy({
    where: {
      id: companyToDeleteId,
    },
  });
};
