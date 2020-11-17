const { check } = require("express-validator");

const subscribeValidation = [
  check("email", "Email is invalid").isEmail(),
  check(
    "password",
    "Password should have between 8 and 12 characters"
  ).isLength({ min: 8, max: 12 }),
  check("name", "Name should have between 2 and 12 characters").isLength({
    min: 2,
    max: 12,
  }),
];

module.exports = subscribeValidation;
