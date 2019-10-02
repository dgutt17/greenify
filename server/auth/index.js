const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    let {email, password} = req.body
    let response = await axios.post('http://localhost:3000/users/sign_in', {
      email,
      password
    })
    let user = response.data
    console.log('user in login: ', user)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.password !== req.body.password) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    let {email, password} = req.body
    let response = await axios.post('http://localhost:3000/users', {
      email,
      password
    })
    let user = response.data
    console.log('user in signup: ', user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

// router.use('/google', require('./google'))
