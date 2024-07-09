const   fs = require('fs'),
        path = require('path');
const HolidayEntity = require("../../entities/holiday");

class AbstractHolidayRepository {
    /**
     *
     * @returns {string}
     * @protected
     */
    __getCurrentDir() {
        return __dirname;
    }


    /**
     *
     * @returns {string}
     * @protected
     */
    __backToDataPath() {
        return `../../../../../data/dados/feriados/`;
    }

    /**
     *
     * @param pathToJoin
     * @returns {string}
     * @protected
     */
    __joinPath(pathToJoin) {
        return path.join(this.__getCurrentDir(),this.__backToDataPath(), pathToJoin);
    }

    /**
     *
     * @param desiredPath
     * @returns {object}
     * @protected
     */
    __loadJSON(desiredPath) {
        const filePath = this.__joinPath(desiredPath);
        if(fs.existsSync(filePath)) {
            try {
                const strFromFile = fs.readFileSync(filePath);
                return JSON.parse(strFromFile.toString('utf-8'));
            } catch (err) {
                throw new Error("Failed to decode "+ filePath+ " as JSON object in abstract repository");
            }
        } else {
            throw new Error("Could not find file in abstract holidays repository " + filePath);
        }
    }

    /**
     *
     * @param {object} obj
     * @param {string} propertyName
     * @param {RegExp} regex
     * @return {boolean}
     * @private
     */
    __propertyMatchesWithRegex(obj, propertyName, regex) {
        return regex.test((obj?.[propertyName] || ''));
    }

    /**
     *
     * @param {{data: string;}} obj
     * @param {RegExp} regex
     * @protected
     * @returns {boolean}
     */
    __propertyDataMatchesWithRegex(obj, regex) {
        return this.__propertyMatchesWithRegex(obj, 'data', regex);
    }

    /**
     * @abstract
     * @returns {string}
     */
    getKindName() {
        throw new Error("must be implemented");
    }

    /**
     *
     * @param {string} month
     * @return {RegExp}
     * @private
     */
    __generateRegexForMonth(month) {
        const monthPadded = month.padStart(2, '0');
        const regexPattern = `^(0[1-9]|[12][0-9]|3[01])/${monthPadded}/\\d{4}$`;
        const regex = new RegExp(regexPattern);
        return regex;
    }


    /**
     * @abstract
     * @return {{regex: RegExp, property: string}[]}
     */
    getExtraPropertiesToMatch() {
       return [];
    }

    /**
     *
     * @param holidayEntry
     * @return {boolean}
     */
    matchExtraProperties(holidayEntry) {
        for(const toTest of this.getExtraPropertiesToMatch()) {
            if(! toTest.regex.test(holidayEntry?.[toTest.property] || ''))
                return false;
        }
        return true;
    }


    /**
     * @abstract
     * @param provinceName
     * @param cityName
     * @param year
     * @param month
     * @returns {Promise<HolidayEntity[]>}
     */
    async getData(provinceName, cityName, year, month) {
        const results = [];
        const JSON_Object = this.__loadJSON(`${this.getKindName()}/json/${year}.json`);
        const regex = this.__generateRegexForMonth(month.toString());
        for(const holidayEntry of JSON_Object) {
            if(this.__propertyDataMatchesWithRegex(holidayEntry, regex) && this.matchExtraProperties(holidayEntry))
                results.push(
                    new HolidayEntity(holidayEntry.nome, holidayEntry.data)
                );
        }
        return results;
    }
}

module.exports = AbstractHolidayRepository;