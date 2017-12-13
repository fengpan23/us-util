const assert = require('assert');
const util = require('../lib/');

const remindList = util.getStateRemind('MI');
assert.equal(remindList.join(), [ 'Michigan', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Wyoming' ].join());

const state1 = util.isUsState('Arizona');
assert.deepEqual(state1, true);

const state2 = util.isUsState('ChangSha');
assert.deepEqual(state2, false);

const state3 = util.isUsState('CO');
assert.deepEqual(state3, true);

const state4 = util.isUsState('co', 'short');
assert.deepEqual(state4, true);

const state5 = util.isUsState('cO');
assert.deepEqual(state5, true);

const state6 = util.isUsState('Washington DC');
assert.deepEqual(state6, true);

// isNumber
assert.deepEqual(false, util.isNumber('1212121a'));
assert.deepEqual(true, util.isNumber('-12.12'));
assert.deepEqual(false, util.isNumber('-.123'));
assert.deepEqual(true, util.isNumber('-1.123'));
assert.deepEqual(true, util.isNumber('121212'));

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

//generateId
assert.deepEqual(36, util.generateId().length);

//clearNumber
assert.deepEqual('123221', util.clearNumber('123 221'));
assert.deepEqual('221', util.clearNumber('abcd 221 abcd'));

//isEmail
assert.deepEqual(true, util.isEmail('test@email.com'));

//isUsCard
assert.deepEqual(true, util.isUsCard('4111111111111111'));
assert.deepEqual(true, util.isUsCard('3782 8224 6310 005'));

//getUsCardType
// assert.deepEqual('Visa', util.getUsCardType('4111111111111111'));
assert.deepEqual('American Express', util.getUsCardType('3 782 8224 6310 005'));
assert.deepEqual('Master Card', util.getUsCardType('5569755825672968'));
assert.deepEqual('Visa', util.getUsCardType('4532421174341278'));