const Colors = require("colors/safe");

class Console {

    static _consolePrefixMsg(theme = null) {
        return Colors.bgBlack(
            Colors.white(
                `[PLANILHA GENERATOR V2] [${theme || Colors.yellow(`INFO`)}] - `
            )
        );
    }

    static printUsage() {
        console.log(
            `${Console._consolePrefixMsg()} Uso incorreto! \n${Colors.bgRed.blue(
                `Apontamento de horas generator\nUsage:\nplanilha-generator MONTH YEAR PROJECT_ID PROJECT_NAME STAKEHOLDER_NAME ROLE_DESCRIPTION\nexample:\n> planilha-generator 1 2024 GER0175 "Gerdau Scrapp" "Thiago Albieri" "Consultoria de Front-end e Back-end"`
            )}`
        );
    }

    /**
     *
     * @param {string} msg
     */
    static errorMsg(msg) {
        console.log(`${Console._consolePrefixMsg(Colors.red(`ERROR`))}${Colors.red(msg)}`);
    }

    /**
     *
     * @param {Error} exception_
     */
    static error(exception_) {
        console.log(`${Console._consolePrefixMsg(Colors.red(`ERROR`))}${Colors.green(exception_.message)}\n${Colors.bgBlack(Colors.red(exception_.stack))}`);
    }

    static message(message) {
        console.log(`${Console._consolePrefixMsg()}${Colors.green(message)}`);
    }

    static success(message) {
        console.log(`${Console._consolePrefixMsg(`SUCCESS`)}${Colors.green(message)}`);
    }

    /**
     *
     * @param {HolidayEntity}holiday
     */
    static warnAboutHoliday(holiday) {
        console.log(
            `${Console._consolePrefixMsg(Colors.yellow('WARNING'))}${Colors.yellow(`Vacilão toma cuidado, eu adicionei na planilha o dia ${holiday.getDate()}`)} mas tem o feriado: ${holiday.getName()}`
        );
    }
}

module.exports = Console;