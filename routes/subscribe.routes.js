const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const { check } = require("express-validator");

const subscribeValidation = [
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
  check("name").isLength({ min: 2 }),
];

router.post("/", subscribeValidation, UsersController.createOne);
router.put("/:id", subscribeValidation, UsersController.updateOne);
router.delete("/:id", UsersController.deleteOne);

module.exports = router;
