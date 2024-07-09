const   Excel = require('exceljs');
const Constants = require('../../../constants');
const Utils = require("../../../utils");
const path = require("path");

const {getBusinessDaysOfMonth, isValidMonth, isValidYear} = Utils.Date;
const {FIRST_FILLABLE_LINE, TOTAL_SUM_LINE_INITIAL_INDEX, SHEET_DIR} = Constants;
/**
 *
 * @param {string} year
 * @param {string} month
 * @param {string} projectId
 * @param {string} projectName
 * @param {string} stakeHolderName
 * @param {string} roleDescription
 * @return {Promise<void>}
 */
async function generateSpreadSheetFor(year, month, projectId, projectName, stakeHolderName, roleDescription) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(SHEET_DIR);
    const businessDays = getBusinessDaysOfMonth(year, month);
    const insertLineCount = businessDays.length;
    const worksheet = workbook.getWorksheet(1);


    const firstLineWithHours = worksheet.getRow(FIRST_FILLABLE_LINE);
    firstLineWithHours.getCell(1).value = projectId;
    firstLineWithHours.getCell(2).value = projectName;
    firstLineWithHours.getCell(3).value = stakeHolderName;
    firstLineWithHours.getCell(4).value = roleDescription;

    worksheet.duplicateRow(FIRST_FILLABLE_LINE, insertLineCount - 1, true);

    for(const [indexOfDate, dateValue] of Object.entries(businessDays)) {
        const row = worksheet.getRow(Number(FIRST_FILLABLE_LINE) + Number(indexOfDate));
        row.getCell(5).value = dateValue;
        row.commit();
    }

    const finalSumRow = worksheet.getRow(TOTAL_SUM_LINE_INITIAL_INDEX + insertLineCount - 1);

    finalSumRow.getCell(6).value = {
        formula: `SUM(F7:F${7 + insertLineCount - 1})`
    };

    finalSumRow.commit();

    await workbook.xlsx.writeFile(path.join(process.cwd(), "resultado.xlxs"));
}

module.exports = generateSpreadSheetFor;