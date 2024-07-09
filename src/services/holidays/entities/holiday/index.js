class HolidayEntity {

    constructor(name, date) {
        this.name = name;
        this.date = date;
    }


    getName() {
        return this.name;
    }

    getDate() {
        return this.date;
    }


}

module.exports = HolidayEntity;