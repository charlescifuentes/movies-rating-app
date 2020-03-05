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

    return res.status(201).json({
      success: true,
      data: rating
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Rating Created',
      error: 'Server Error'
    });
  }
});

//@route    PUT api/ratings
//@desc     Update rating
//@acces    Public
router.put('/:id', async (req, res) => {
  try {
    const rating = await Ratings.findOneAndUpdate(
      { _id: req.params.id },
      {
        user: req.body.user,
        rating: req.body.rating,
        movieID: req.body.movieid
      }
    );

    return res.status(201).json({
      message: 'Rating updated',
      data: rating
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/ratings/:id
//@desc     Delete rating
//@acces    Public
router.delete('/:id', async (req, res) => {
  try {
    await Ratings.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).send('Rating deleted');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
