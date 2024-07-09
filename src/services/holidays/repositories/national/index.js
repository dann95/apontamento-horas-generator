const BaseClass = require("../abstract");

class NationalRepository extends BaseClass {
    getKindName() {
        return "nacional";
    }
}

module.exports = NationalRepository;