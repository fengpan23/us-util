const StateMap = require('./state_map.json');

function getRemind(input) {
	const hints = [];
    if (StateMap[input.toUpperCase()]) {
        hints.push(StateMap[input.toUpperCase()]);
    }
    const reg = new RegExp(input, 'i')
    Object.values(StateMap).forEach((state) => {
        if (reg.test(state)) {
            hints.push(state);
        }
    });
    return hints;
}

function isUsState(input) {
	return Boolean(StateMap[input.toUpperCase()]) || Object.values(StateMap).includes(input);
}

module.exports = {
	getRemind,
	isUsState
}