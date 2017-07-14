const assert = require('assert');
const util = require('../lib/');

const remindList = util.getRemind('MI');
assert.deepEqual(remindList, [ 'Michigan', 'Federated States Of Micronesia', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Wyoming' ]);

const state1 = util.isUsState('Arizona');
assert.deepEqual(state1, true);

const state2 = util.isUsState('ChangSha');
assert.deepEqual(state2, false);

const state3 = util.isUsState('CO');
assert.deepEqual(state3, true);