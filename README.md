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