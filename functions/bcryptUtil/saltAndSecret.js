const saltRounds = 5;
const secret = '$2b$05$STdYX9CRyh588uQxwAG4buDz0TehQVqSPjI4ZDzcEHl5c1/CdH1JW';
// Note to self: from ternminal run "node" and then "require('crypto').randomBytes(64).toString('hex')" to get a random crypto string!!!

module.exports = {
  saltRounds,
  secret
};