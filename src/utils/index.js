const DateHelper = require('./date');
const Console = require('./console');


/**
 *
 * @type {{Console: Console, Date: DateHelper}}
 */
const Index = {
    Date: DateHelper,
    Console
};

module.exports = Index;
