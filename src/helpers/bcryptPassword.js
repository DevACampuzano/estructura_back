const bcrypt = require("bcrypt");
const encrytPassword = async (password = "") => {
  const newPasword = await bcrypt.hash(password, 10);
  return newPasword;
};

const validePassword = (password = "", hash) => {
  const compare = bcrypt.compare(password, hash);
  return compare;
};
module.exports = {
  encrytPassword,
  validePassword,
};
