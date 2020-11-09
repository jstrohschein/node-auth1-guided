const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// we will bring bcrypt onboard

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// endpoints


server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
