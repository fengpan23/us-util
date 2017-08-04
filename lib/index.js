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
     * split number    1223300 => 1,223,300
     * @param  {Number, String} input
     * @return {String}
     */
    usUtil.splitNumber = function (input) {
        var numberStr = String(input);
        var remainder = '';
        const pointIndex = numberStr.indexOf('.');
        if (pointIndex > -1) {
            remainder = numberStr.substr(pointIndex);
            numberStr = numberStr.substr(0, pointIndex);
        }
        const numberArr = [];
        while (numberStr.length >= 4) {
            numberArr.unshift(numberStr.substr(-3));
            numberStr = numberStr.slice(0, -3);
        }
        numberArr.unshift(numberStr);
        return numberArr.join(',') + remainder;
    }

    /**
     * const StateMap => {Al: Alabama, Ak: Alaska, ...}
     */
    usUtil.StateMap = function () {
        var stateStr = "AL_Alabama,AK_Alaska,AS_American Samoa,AZ_Arizona,AR_Arkansas,CA_California,CO_Colorado,CT_Connecticut,DE_Delaware,DC_District Of Columbia,FM_Federated States Of Micronesia,FL_Florida,GA_Georgia,GU_Guam,HI_Hawaii,ID_Idaho,IL_Illinois,IN_Indiana,IA_Iowa,KS_Kansas,KY_Kentucky,LA_Louisiana,ME_Maine,MH_Marshall Islands,MD_Maryland,MA_Massachusetts,MI_Michigan,MN_Minnesota,MS_Mississippi,MO_Missouri,MT_Montana,NE_Nebraska,NV_Nevada,NH_New Hampshire,NJ_New Jersey,NM_New Mexico,NY_New York,NC_North Carolina,ND_North Dakota,MP_Northern Mariana Islands,OH_Ohio,OK_Oklahoma,OR_Oregon,PW_Palau,PA_Pennsylvania,PR_Puerto Rico,RI_Rhode Island,SC_South Carolina,SD_South Dakota,TN_Tennessee,TX_Texas,UT_Utah,VT_Vermont,VI_Virgin Islands,VA_Virginia,WA_Washington,WV_West Virginia,WI_Wisconsin,WY_Wyomin";
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
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    function capitalizeFirstLetter(string) {
        const strArr = string.split(' ').map(function(str){return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()});
        return strArr.join(' ');
    }

    /**
     * find state where match input
     * @param  {[type]} input [description]
     * @return {[type]}       [description]
     */
    usUtil.getStateRemind = function(input) {
    	const hints = [];
        if (this.StateMap[input.toUpperCase()]) {
            hints.push(this.StateMap[input.toUpperCase()]);
        }
        const reg = new RegExp(input, 'i');
        Object.values(this.StateMap).forEach(function(state){
            if (reg.test(state)) {
                hints.push(state);
            }
        });
        return hints;
    }

    /**
     * is United States  state
     * @param  {string}  input  verify string
     * @param  {[string]}  type  only verify type
     * @return {Boolean}       is state
     */
    usUtil.isUsState = function(input, type) {
        if (type === 'long') {
            return Object.values(this.StateMap).includes(capitalizeFirstLetter(input));
        } else if (type === 'short') {
            return Boolean(this.StateMap[input.toUpperCase()]);
        } else {
        	return Boolean(this.StateMap[input.toUpperCase()]) || Object.values(this.StateMap).includes(capitalizeFirstLetter(input));
        }
    }

    if (typeof define === 'function' && define.amd) {
        define('usUtil', [], function() {
          return usUtil;
        });
    }
}.call(this));