const express = require('express');
const router = express.Router();

const Ratings = require('../models/Ratings');

//@route    GET api/ratings/:user/:movieid
//@desc     Get rating by user and movie
//@acces    Public

router.get('/:user/:movieid', async (req, res) => {
  try {
    const rating = await Ratings.find({
      user: req.params.user,
      movieID: req.params.movieid
    });
    res.json(rating);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/ratings
//@desc     Add rating
//@acces    Public
router.post('/', async (req, res) => {
  try {
    const newRating = new Ratings({
      user: req.body.user,
      rating: req.body.rating,
      movieID: req.body.movieid
    });

    const rating = await newRating.save();
    console.log(newRating);
    console.log(rating);

    return res.status(201).json({
      success: true,
      data: rating
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
