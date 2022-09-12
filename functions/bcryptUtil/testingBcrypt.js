const bcrypt = require('bcrypt-js');
const { saltRounds, secret } = require('./saltAndSecret');

const authenticationController = {};

// add password here first for salting Admin passwords before updating MongoDB
const password = 'maxwell123';

authenticationController.setCookie = async () => {
  const hashedPassword = await bcrypt.hash(password + secret, saltRounds);
  console.log(hashedPassword);

  return hashedPassword;
}

authenticationController.setCookie();


// authenticationController.verifyCookie = async () => {
//   const realPassword = await bcrypt.compare(password + secret, '$2b$05$STdYX9CRyh588uQxwAG4buDz0TehQVqSPjI4ZDzcEHl5c1/CdH1JW');
//   console.log(realPassword);

//   return realPassword;
// }

// authenticationController.verifyCookie();