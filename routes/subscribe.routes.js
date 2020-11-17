const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const subscribeValidation = require("../middlewares/subscribeValidation");

router.post("/", subscribeValidation, UsersController.createOne);
router.put("/:id", subscribeValidation, UsersController.updateOne);
router.delete("/:id", UsersController.deleteOne);

module.exports = router;
