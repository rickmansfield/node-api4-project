const express = require('express');

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware');

const User = require('./users-model');
const Post = require('../posts/posts-model');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({ name: req.name })
    .then(newUser => {
      //throw new Error('testing')
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
    .then(() => {
      return User.getById(req.params.id)
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
    .then(() => {
      res.status(200).json(
        req.user
      )
    })
    .catch(next)
});
//Alternative delete 
// router.delete('/:id', validateUserId, async (req, res, next) => {
//   try{
//     await User.remove(req.params.id)
//     res.status(200).json(req.user)
//   } catch (err) {
//     next(err)
//   }
// });

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const result = await User.getUserPosts(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    //throw new Error ('for testing')
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }

});

router.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    customerMessage: "Something tragic happened inside posts router ",
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
