const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// we will bring bcrypt onboard

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// [POST] register and login (we need to send paylod - req.body)
server.post('/auth/register', (req, res) => {

})

server.post('/auth/login', (req, res) => {

})

// [GET] logout no need for req.body
server.get('/auth/logout', (req, res) => {

})


server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
