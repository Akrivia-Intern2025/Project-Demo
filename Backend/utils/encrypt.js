const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };

// const bcrypt = require("bcryptjs");

// const hashPassword = (password) => {
//   return bcrypt.genSalt(10).then((salt) => {
//     return bcrypt.hash(password, salt);
//   });
// };

// const comparePassword = (password, hash) => {
//   return bcrypt.compare(password, hash);
// };

// module.exports = { hashPassword, comparePassword };
