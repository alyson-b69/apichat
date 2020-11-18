const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "https://kitten-box.wild-dev.com" }));

const server = require("http").createServer(app);

const socketOptions = {
  cors: true,
  origins: ["https://kitten-box.wild-dev.com"],
};

const io = require("socket.io")(server, socketOptions);

const port = process.env.HTTP_PORT;
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/isAuthenticated");

const users = require("./routes/users.routes.js");
const subscribe = require("./routes/subscribe.routes.js");
const login = require("./routes/login.routes.js");
const messages = require("./routes/messages.routes.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(isAuthenticated);
app.use("/users", users);
app.use("/subscribe", subscribe);
app.use("/login", login);
app.use("/messages", messages);

let socketUsers = {};

function formatList(list) {
  let formatted = [];
  for (let i in list) {
    formatted.push(list[i]);
  }
  return formatted;
}

io.on("connection", (client) => {
  console.log("New client connected");
  client.on("user", (user) => {
    if (Object.keys(socketUsers).length) {
      if (
        Object.values(socketUsers)
          .map((item) => parseInt(item.id))
          .includes(parseInt(user.userId))
      ) {
        console.log("user déjà connecté");
      } else {
        socketUsers[client.id] = {
          id: parseInt(user.userId),
          name: user.userName,
        };
      }
    } else {
      socketUsers[client.id] = {
        id: parseInt(user.userId),
        name: user.userName,
      };
    }

    client.broadcast.emit("log", {
      type: "login",
      content: user.userName + " is now connected",
    });

    io.emit("info", {
      type: "users-list",
      content: formatList(socketUsers),
    });

    client.broadcast.emit("info", {
      type: "users-list",
      content: formatList(socketUsers),
    });
    console.log(socketUsers);
  });

  client.on("message", (message) => {
    client.broadcast.emit("message", message);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
    if (socketUsers[client.id]) {
      client.broadcast.emit("log", {
        type: "logout",
        content: socketUsers[client.id].name + " is now disconnected",
      });
    }
    delete socketUsers[client.id];
    io.emit("info", { type: "users-list", content: formatList(socketUsers) });
  });
});

server.listen(port, () => {
  console.info(`Server listening on  : ${port}`);
});
