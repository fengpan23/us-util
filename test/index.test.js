const assert = require('assert');
const util = require('../lib/');

const remindList = util.getStateRemind('MI');
assert.equal(remindList.join(), [ 'Michigan', 'Federated States Of Micronesia', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Wyomin' ].join());

const state1 = util.isUsState('arizona');
assert.deepEqual(state1, true);

const state2 = util.isUsState('ChangSha');
assert.deepEqual(state2, false);

const state3 = util.isUsState('CO');
assert.deepEqual(state3, true);

const state4 = util.isUsState('co', 'short');
assert.deepEqual(state4, true);

const state5 = util.isUsState('cO');
assert.deepEqual(state5, true);

const numberStr1 = util.splitNumber(12345);
assert.deepEqual(numberStr1, '12,345');

const numberStr2 = util.splitNumber(10345.235);
assert.deepEqual(numberStr2, '10,345.235');

assert.deepEqual(true, util.isUsZipCode(12345));
assert.deepEqual(true, util.isUsZipCode('12345'));
assert.deepEqual(false, util.isUsZipCode('123456'));

// formatPhoneNumber

assert.deepEqual('(121) 212', util.formatPhoneNumber(121212));
assert.deepEqual('(121) 212-1212', util.formatPhoneNumber(1212121212));