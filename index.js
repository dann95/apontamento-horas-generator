const   Excel = require('exceljs'),
        Utils = require('./src/utils'),
        Constants = require('./src/constants');

const {getBusinessDaysOfMonth, isValidMonth, isValidYear} = Utils;
const {FIRST_FILLABLE_LINE, TOTAL_SUM_LINE_INITIAL_INDEX, SHEET_DIR} = Constants;

async function main() {
    const args = getArgs();
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(SHEET_DIR);
    const businessDays = getBusinessDaysOfMonth(args[1], args[0]);
    const insertLineCount = businessDays.length;
    const worksheet = workbook.getWorksheet(1);


    const firstLineWithHours = worksheet.getRow(FIRST_FILLABLE_LINE);
    firstLineWithHours.getCell(1).value = 'GER0175';
    firstLineWithHours.getCell(2).value = 'Gerdau Scrapp';
    firstLineWithHours.getCell(3).value = 'Thiago Albieri';
    firstLineWithHours.getCell(4).value = 'Consultoria de front-end e back-end';

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

    await workbook.xlsx.writeFile("resultado.xlsx");
}

function printUsage() {
    console.log(`Apontamento de horas generator\nUsage:\nnode index.js MONTH YEAR\nexample:\n> node index.js 1 2024`);
}

/**
 *
 * @returns {boolean}
 */
function validateInput() {

    if(process.argv.length !== 4) {
        return false;
    }
    const args = getArgs();

    return isValidMonth(args[0]) && isValidYear(args[1]);
}

/**
 *
 * @returns {number[]}
 */
function getArgs() {
    return [Number(process.argv[2]), Number(process.argv[3])];
}

(async () => {
    try {
        if(validateInput()) {
            await main();
        } else {
            printUsage();
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
