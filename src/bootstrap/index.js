const generateSpreadSheetFor = require("../acme/core/generator");
const checkAndWarnAboutHolidays = require("../acme/core/holidays/checker");
const Utils = require("../utils");

/**
 *
 * @returns {*[]}
 */
function getArgs() {
    return process.argv.slice(2);
}

async function bootstrap() {
    const args = getArgs();
    // if (args.length === 0) {
    //     await bootstrapByGUI();
    // } else {
        await bootstrapByCliArgs(args[1], args[0], args[2], args[3], args[4], args[5], args[6]);
    // }
}

async function bootstrapByCliArgs(year, month, projectId, projectName, stakeHolderName, roleDescription) {
    await generateSpreadSheetFor(year, month, projectId, projectName, stakeHolderName, roleDescription);
    await checkAndWarnAboutHolidays(year, month);
    Utils.Console.success(`Planilha gerada com sucesso, encontre ela em: ./resultado.xlsx`);
    Utils.Console.message(`obrigado pela preferencia`);
}

// async function bootstrapByGUI() {
//
// }


module.exports = bootstrap;