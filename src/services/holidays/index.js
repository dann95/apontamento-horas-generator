const NationalRepository = require("./repositories/national");
const ProvinceRepository = require("./repositories/province");
const MunicipalityRepository = require("./repositories/municipality");



const HolidayObligations = Object.freeze({
    Obligated: 'obligated',
    Optional: 'optional',
});


class HolidayLookupResult {

    constructor(listOfHolidays) {
        this._holidaysList = listOfHolidays || [];
    }

    /**
     *
     * @returns {boolean}
     */
    thereAreHolidays() {
        return this._holidaysList.length > 0;
    }

    getHolidaysList() {
        return this._holidaysList;
    }
}

class HolidaysService {

    constructor() {
        this._nationalRepository = new NationalRepository();
        this._provinceRepository = new ProvinceRepository();
        this._municipalRepository = new MunicipalityRepository();
    }

    /**
     *
     * @param {number} year
     * @param {number} month
     * @param {string} provinceName
     * @param {string} cityName
     * @returns {Promise<HolidayLookupResult>}
     */
    async computeHolidaysFor(year, month, provinceName, cityName) {
        const listOfHolidays = [];

        const national = await this._nationalRepository.getData(provinceName, cityName, year, month);
        const province = await this._provinceRepository.getData(provinceName, cityName, year, month);
        const municipal = await this._municipalRepository.getData(provinceName, cityName, year, month);

        listOfHolidays.push(...national, ...province, ...municipal);
        const result = new HolidayLookupResult(listOfHolidays);
        return result;
    }
}


const instance = new HolidaysService();

module.exports = instance;