const monthRegex = /^(0?[1-9]|1[0-2])$/;
const yearRegex = /^\d{4}$/;

class DateHelper {
    /**
     *
     * @param {string|number} month
     * @returns {boolean}
     */
    static isValidMonth(month) {
        return monthRegex.test(month || '');
    }

    /**
     *
     * @param {string|number} year
     * @returns {boolean}
     */
    static isValidYear(year) {
        return yearRegex.test(year || '');
    }

    /**
     *
     * @param {number} year
     * @param {number} month
     * @returns {string[]}
     */
    static getBusinessDaysOfMonth(year, month) {
        const businessDays = [];
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month - 1, day);
            const dayOfWeek = currentDate.getDay();

            // Check if the current day is a business day (Monday to Friday)
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
                businessDays.push(formattedDate);
            }
        }
        return businessDays;
    }
}

module.exports = DateHelper;