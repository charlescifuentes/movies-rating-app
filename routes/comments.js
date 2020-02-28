const express = require('express');
const router = express.Router();

const Comments = require('../models/Comments');

//@route    GET api/comments
//@desc     Get all comments
//@acces    Public
router.get('/', async (req, resp) => {
  try {
    const comments = await Comments.find({});
    resp.json(comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/comments
//@desc     Add comment
//@acces    Public
router.post('/', async (req, res) => {
  try {
    const newComment = new Comments({
      user: req.body.user,
      comment: req.body
    });

    const comment = await newComment.save();

    return res.status(201).json({
      success: true,
      data: comment
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
