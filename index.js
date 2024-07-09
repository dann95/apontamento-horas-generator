const {Console} = require('./src/utils');
const bootstrap = require("./src/bootstrap");

/**
 *
 * @returns {boolean}
 */
function validateInput() {
    // @TODO make sure data make sense to each position.
    // ex: month matches with month, year with year, projectId
    return process.argv.length == 9;
}

(async () => {
    try {
        if(validateInput()) {
            await bootstrap();
        } else {
            Console.printUsage();
        }
        process.exit(0);
    } catch (e) {
        Console.error(e);
        Console.errorMsg(`Forced Finishing Planilha Generator V2`);
        process.exit(1);
    }
})();
