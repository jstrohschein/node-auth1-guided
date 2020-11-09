const router = require("express").Router();

const Users = require("./users-model.js");

// put this middleware in a centralized location
function secure(req, res, next) {
  next()
}

router.get("/", secure, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
