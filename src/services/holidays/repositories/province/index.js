const BaseClass = require("../abstract");

class ProvinceRepository extends BaseClass {
    getKindName() {
        return "estadual";
    }

    /**
     *
     * @return {{regex: RegExp, property: string}[]}
     */
    getExtraPropertiesToMatch() {
        return [
            {
                property: 'uf',
                regex: /^SP$/
            }
        ];
    }
}

module.exports = ProvinceRepository;