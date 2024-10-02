/* jshint esversion: 9 */

// generate a secret key to use with the JWT for signing in purposes
const secretKey = [...Array(30)]
    .map(n => ((Math.random() * 36) | 0).toString(36))
    .join('');

// 30 characters long, base 36 encoded 
// console.log(key);

module.exports = {secretKey};


