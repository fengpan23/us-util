# us-util
us util

# intall
npm install us-util --save

# function

## formatPhoneNumber

* format phone number (length = 10)
* eg: 
*   1212121212  =>  (121) 212-1212
* @param  {Number} input  need format number   
* @return {String} 

## splitNumber

* split number    1223300 => 1,223,300
* @param  {Number, String} input
* @return {String}

## StateMap (const)

* US State Map => {Al: Alabama, Ak: Alaska, ...}
* @return {Object}

## capitalizeFirstLetter

* capitalize first letter, lower case others
* eg: firstName => Firstname
* eg: first name => First Name
* @param  {String} string need capitalize string
* @return {String}  

## getStateRemind 
* find us state where match input
* eg:
* MI =>  [ 'Michigan', 'Federated States Of Micronesia', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Wyomin' ]
* @param  {String} input 
* @return {Array}       []

## getLongState 
* get long state
* eg:
* MI =>  'Michigan'
* @param  {string} short state
* @return {string} long state

## getShortState 
* get short state
* eg:
* 'Michigan' => 'MI'
* @param  {string} short state
* @return {string} long state

## isUsState

* is United States  state
* @param  {String}  input  verify string
* @param  {String}  type  only verify type
* @return {Boolean}       is state

## isNumber

* number check
* @param  {String | Number}  input
* @return {Boolean} 

## isUsZipCode

* is us zip code
* @param  {String | Number}  input
* @return {Boolean}

## generateId

* Generates a RFC-4122 version 4 compliant globally unique identifier.
* @return {String}

## isEmail
* is email
* @param  {String}  input
* @return {Boolean}

## clearNumber
* clear number
* @param  {string}
* @return {string}       only number
* eg: '1234 1212 sdf' => 12341212

## getUsCardType
* get us card type
* @param  {String} input 
* @return {String}      	on of card type

## isUsCard
* is us card check
* @param  {String}  input 
* @return {Boolean}  