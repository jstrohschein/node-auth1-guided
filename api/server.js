const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// we will bring bcrypt onboard
const bcrypt = require('bcryptjs');
// pull in Users model (to do db operations)
const Users = require('../users/users-model');

const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// [POST] register and login (we need to send paylod - req.body)
server.post('/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // do the hash, add the hash to the db
    const hash = bcrypt.hashSync(password, 10); // 2 ^ 10 rounds of hashing
    // we will insert a record WITHOUT the raw password
    const user = { username, password: hash, role: 2 };
    const addedUser = await Users.add(user);
    // send back the record to the client
    res.json(addedUser);
  } catch (err) {
    // res.status(500).json({ message: 'Something went terrible' }) // PRODUCTION
    res.status(500).json({ message: err.message })
  }
})

server.post('/auth/login', async (req, res) => {
  // checks whether credentials legit
  try {
    // 1- use the req.username to find in the db the user with said username 
    // 2- compare the bcrypt has of the user we just pulled against req.body.password
    const user = await Users.findBy({ username: req.body.username })
    // 3- if no user, send back a failure message
    // 4- if user but credentials bad send packing
    // 5- if user AND credentials good then welcome message
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// [GET] logout no need for req.body
server.get('/auth/logout', (req, res) => {

})


server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
