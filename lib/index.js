(function() {
    if (typeof Object.values !== 'function') {
        Object.values = function(x) {
            return Object.keys(x).reduce(function(y, z){return y.push(x[z]) && y}, []);
        }
    }

    // Create a safe reference to the usUtil object for use below.
    var usUtil = function(obj) {
        if (obj instanceof usUtil) return obj;
        if (!(this instanceof usUtil)) return new usUtil(obj);
    };

    // Export the usUtil object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = usUtil;
        }
        exports.usUtil = usUtil;
    } else {
        root.usUtil = usUtil;
    }

    /**
     * format phone number (length = 10)
     * 
     * eg: 
     *   1212121212  =>  (121) 212-1212
     *   
     * @param  {Number} input  need format number   
     * @return {String}  
     */
    usUtil.formatPhoneNumber = function(input) {
        var number = String(input) || '';
        if (number) {
            number = number.replace(/[^0-9]/ig, '');
        }

        var phoneNumber = number;
        if (number.length > 3) {
            phoneNumber = '(' + number.slice(0, 3) + ') ';
        }
        if (number.length > 6) {
            phoneNumber += number.slice(3, 6) + '-' + number.substr(6);
        } else {
            phoneNumber += number.substr(3);
        }
        return phoneNumber;
    }

    /**
     * split number    1223300 => 1,223,300
     * @param  {Number, String} input
     * @return {String}
     */
    usUtil.splitNumber = function (input) {
        var numberStr = String(input);
        var remainder = '';
        var pointIndex = numberStr.indexOf('.');
        if (pointIndex > -1) {
            remainder = numberStr.substr(pointIndex);
            numberStr = numberStr.substr(0, pointIndex);
        }
        var numberArr = [];
        while (numberStr.length >= 4) {
            numberArr.unshift(numberStr.substr(-3));
            numberStr = numberStr.slice(0, -3);
        }
        numberArr.unshift(numberStr);
        return numberArr.join(',') + remainder;
    }

    /**
     * Generates a RFC-4122 version 4 compliant globally unique identifier.
     * @return {String}
     */
    usUtil.generateId = function () {
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        id = id.replace(/[xy]/g, function(c) {
            var r = Math.floor(Math.random() * 16);
            var v;
            if (c === 'x') {
                v = r;
            } else {
                v = (r & 0x3) | 0x8;
            }
            return v.toString(16);
        });
        return id;
    }

    /**
     * const StateMap => {Al: Alabama, Ak: Alaska, ...}
     */
    usUtil.StateMap = function () {
        var stateStr = 'AL_Alabama,AK_Alaska,AZ_Arizona,AR_Arkansas,CA_California,CO_Colorado,CT_Connecticut,DE_Delaware,FL_Florida,GA_Georgia,HI_Hawaii,ID_Idaho,IL_Illinois,IN_Indiana,IA_Iowa,KS_Kansas,KY_Kentucky,LA_Louisiana,ME_Maine,MD_Maryland,MA_Massachusetts,MI_Michigan,MN_Minnesota,MS_Mississippi,MO_Missouri,MT_Montana,NE_Nebraska,NV_Nevada,NH_New Hampshire,NJ_New Jersey,NM_New Mexico,NY_New York,NC_North Carolina,ND_North Dakota,OH_Ohio,OK_Oklahoma,OR_Oregon,PA_Pennsylvania,RI_Rhode Island,SC_South Carolina,SD_South Dakota,TN_Tennessee,TX_Texas,UT_Utah,VT_Vermont,VA_Virginia,WA_Washington,DC_Washington DC,WV_West Virginia,WI_Wisconsin,WY_Wyoming';
        var stateObj = {};
        stateStr.split(',').forEach(function (state) {
            var s = state.split('_');
            stateObj[s[0]] = s[1];
        });
        return stateObj;
    }();

    /**
     * capitalize first letter, lower case others
     * eg: firstName => Firstname
     * eg: first name => First Name
     * @param  {String} string need capitalize string
     * @return {String}        
     */
    function capitalizeFirstLetter(string) {
        var strArr = string.split(' ').map(function(str){return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()});
        return strArr.join(' ');
    }

    /**
     * find us state where match input
     * eg:
     *     MI =>  [ 'Michigan', 'Federated States Of Micronesia', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Wyomin' ]
     * @param  {String} input 
     * @return {Array}       []
     */
    usUtil.getStateRemind = function(input) {
    	var hints = [];
        if (usUtil.StateMap[input.toUpperCase()]) {
            hints.push(usUtil.StateMap[input.toUpperCase()]);
        }
        var reg = new RegExp(input, 'i');
        Object.values(usUtil.StateMap).forEach(function(state){
            if (reg.test(state)) {
                hints.push(state);
            }
        });
        return hints;
    }

    usUtil.getShortState = function(longState) {
        var values = Object.values(usUtil.StateMap);

        var index = values.indexOf(longState);
        if (index > -1) {
            return Object.keys(usUtil.StateMap)[index];
        }
        return null;
    }

    /**
     * get long state
     * @param  {string} short state
     * @return {string} long state
     */
    usUtil.getLongState = function(shortState) {
        return usUtil.StateMap[shortState.toUpperCase()];
    }

    /**
     * is United States  state
     * @param  {String}  input  verify string
     * @param  {String}  type  only verify type
     * @return {Boolean}       is state
     */
    usUtil.isUsState = function(input, type) {
        if (type === 'long') {
            return Object.values(usUtil.StateMap).includes(input);
        } else if (type === 'short') {
            return Boolean(usUtil.StateMap[input.toUpperCase()]);
        } else {
        	return Boolean(usUtil.StateMap[input.toUpperCase()]) || Object.values(usUtil.StateMap).includes(input);
        }
    }

    /**
     * number check
     * @param  {String | Number}  input
     * @return {Boolean}      
     */
    usUtil.isNumber = function(input) {
        if (typeof input === 'number') {
            return true;
        }
        if (input != null) {
            var reg = new RegExp(/^[-+]?[0-9]+(\.[0-9]+)?$/);
            return reg.test(input);
        }
        return false;
    }

    /**
     * clear number
     * @param  {string}
     * @return {string}       only number
     *
     * eg: '1234 1212 sdf' => 12341212
     */
    usUtil.clearNumber = function(input) {
        return String(input).replace(/[^0-9|.]/ig, '');
    }

    /**
     * is us zip code
     * @param  {String | Number}  input
     * @return {Boolean}
     */
    usUtil.isUsZipCode = function(input) {
        if (usUtil.isNumber(input)) {
            return String(input).length === 5;
        }
    }

    /**
     * is email
     * @param  {String}  input
     * @return {Boolean}
     */
    usUtil.isEmail = function(input) {
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(input);
    }

    /******** card ***********/
    var US_CARDS = [
        {type: 'American Express', prefix: /^3[47]/, size: [15]},
        {type: 'Diners Club', prefix: /^(3[6-9]|30([0-5]|9))/, size: [14, 16]}, 
        {type: 'Discover', prefix: /^(6(5|011|4[4-9]|22))/, size: [16]}, 
        {type: 'JCB', prefix: /^35(2[89]|[3-8][0-9])/, size: [15, 16]}, 
        {type: 'Maestro', prefix: /^(50(18|2|3)|5[68]|6(304|7))/, size: [12, 19]}, 
        {type: 'Master Card', prefix: /^5[1-5]/, size: [16]}, 
        {type: 'UnionPay', prefix: /^62/, size: [16, 19]}, 
        {type: 'Visa', prefix: /^4/, size: [13, 16]}, 
        {type: 'Default', prefix: /^\d{1,4}/g, size: [13, 19]}
    ];

    /**
     * get us card type
     * @param  {String} input 
     * @return {String}      on of card type
     */
    usUtil.getUsCardType = function(input) {
        for(var i = 0; i < US_CARDS.length; i++) {
            if(usUtil.clearNumber(input).match(US_CARDS[i].prefix)) {
                return US_CARDS[i].type;
            }
        }
        return 'Default';
    }

    /**
     * is us card check
     * @param  {String}  input 
     * @return {Boolean}  
     */
    usUtil.isUsCard = function(input) {
        var card = usUtil.clearNumber(input);
        var type = usUtil.getUsCardType(card);

        var len = US_CARDS.find(function(item) {return item.type === type}).size;
        return card.length >= len[0] && card.length <= len[len.length - 1];
    }
    /******** card ***********/

    if (typeof define === 'function' && define.amd) {
        define('usUtil', [], function() {
            return usUtil;
        });
    }
}.call(this));