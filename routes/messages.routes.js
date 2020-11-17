const express = require("express");
const router = express.Router();
const MessagesController = require("../controllers/messages.controller");

router.get("/", MessagesController.getAllFrom);
router.post("/", MessagesController.createOne);

module.exports = router;
