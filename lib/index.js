const StateMap = require('./state_map.json');

/**
 * capitalize first letter, lower case others
 * eg: firstName => Firstname
 * eg: first name => First Name
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
function capitalizeFirstLetter(string) {
    const strArr = string.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
    return strArr.join(' ');
}

/**
 * find state where match input
 * @param  {[type]} input [description]
 * @return {[type]}       [description]
 */
function getStateRemind(input) {
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
	getStateRemind,
	isUsState,
    StateMap
}