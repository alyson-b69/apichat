const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getOne);

module.exports = router;
