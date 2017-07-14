const StateMap = require('./state_map.json');

/**
 * capitalize first letter, lower case others
 * eg: firstName => Firstname
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * find remind where match input
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
function getRemind(input) {
	const hints = [];
    if (StateMap[input.toUpperCase()]) {
        hints.push(StateMap[input.toUpperCase()]);
    }
    const reg = new RegExp(input, 'i');
    Object.values(StateMap).forEach((state) => {
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
function isUsState(input, type) {
    if (type === 'long') {
        return Object.values(StateMap).includes(capitalizeFirstLetter(input));
    } else if (type === 'short') {
        return Boolean(StateMap[input.toUpperCase()]);
    } else {
    	return Boolean(StateMap[input.toUpperCase()]) || Object.values(StateMap).includes(capitalizeFirstLetter(input));
    }
}

module.exports = {
	getRemind,
	isUsState
}