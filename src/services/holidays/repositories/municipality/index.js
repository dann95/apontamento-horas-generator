const BaseClass = require("../abstract");

class MunicipalityRepository extends BaseClass {

    getKindName() {
        return "municipal";
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
            },
            {
                property: 'municipio',
                regex: /\bSão Paulo\b/
            }
        ];
    }

}

module.exports = MunicipalityRepository;