const router = require('express').Router();
const users = require('../users/users-model');
const bcrypt = require('bcryptjs');

const usersRouter = require('../users/users-router');


router.post('/register', (req, res) => {

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: err});
    })

})

router.post('/login', (req, res) => {

  let {username, password} = req.body

  users.findBy({username}).first()
    .then(user => {

      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user
        res.status(200).json(user)
      }

      else{
        res.status(401).json({ message: 'invalid creds' })
      }
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.get('/logout', (req, res) => {
  if(req.session && req.session.user){
    req.session.destroy(err =>{
      if(err){
        res.send('unable to logout')
      }else{
        res.send('goodbye')
      }
    })
    
  }
})

module.exports = router