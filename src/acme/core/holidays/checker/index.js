const Utils = require("../../../../utils");
const HolidaysService = require("../../../../services/holidays");
/**
 *
 * @param year
 * @param month
 * @return {Promise<void>}
 */
async function checkAndWarnAboutHolidays(year, month) {
    const result = await HolidaysService.computeHolidaysFor(
        year,
        month,
        'SP',
        'São Paulo'
    );
    // warn stdout about holidays if there are.
    if(result.thereAreHolidays()) {
        for(const holiday of result.getHolidaysList()) {
            Utils.Console.warnAboutHoliday(holiday);
        }
    }
}

module.exports = checkAndWarnAboutHolidays;