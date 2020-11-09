const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.HTTP_PORT;
const bodyParser = require("body-parser");
const users = require("./routes/users.routes.js");
const subscribe = require("./routes/subscribe.routes.js");
const login = require("./routes/login.routes.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/subscribe", subscribe);
app.use("/login", login);

app.listen(port, () => {
  console.info(`App listening on : http://localhost:${port}`);
});
