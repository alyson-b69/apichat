const md5 = require("md5");

const SALT = "Choùcr0ut3";

exports.generatePassword = (password) => {
  return md5(SALT + password);
};

exports.validateEmail = (email) => {
  return (
    email !== undefined &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  );
};

exports.validatePassword = (password) => {
  return password !== undefined && password.length >= 8;
};
