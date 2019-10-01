const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    let {email, password} = req.body
    response = await axios.post('http://localhost:3000/users', {
      email,
      password
    })
    user = response.data
    console.log('response: ', user)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
