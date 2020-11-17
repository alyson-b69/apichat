const md5 = require("md5");
const dotenv = require("dotenv").config();
const SALT = process.env.SALT;

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
