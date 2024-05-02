const path = require("path");

const Constants = {
    FIRST_FILLABLE_LINE: 7,
    TOTAL_SUM_LINE_INITIAL_INDEX: 8,
    SHEET_DIR: path.join(process.cwd(), 'src', 'samples',"sample.xlsx")
}

module.exports = Constants;
