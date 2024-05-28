/**
 * Validates if a file is an Excel file based on its extension.
 * @param fileName - The name of the file to validate.
 * @returns True if the file has a valid Excel extension, otherwise false.
 */
export const isValidExcelFile = (fileName: string): boolean => {
    const validExtensions = /\.(xls|xlsx)$/i;
    return validExtensions.test(fileName);
};
