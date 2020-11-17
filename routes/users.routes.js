const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");

router.get("/", UsersController.getAll);
router.get("/messages", UsersController.getAllWithMessages);
router.get("/find", UsersController.findAllBy);
router.get("/:id", UsersController.getOne);

module.exports = router;
