const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review');

app.get('/api/reviews', function(req, res) {
  const review = {};
  if (req.query.year) {
      review.year = req.query.year;
  }
  if (req.query.semester) {
      review.semester = req.query.semester;
  }
  Review.find(review, (err, reviews) => {
    if (err) {
        console.log(err);
    }
    res.json(reviews);
  });
});

app.post('/api/review/create', (req, res) => {
  const addReview = new Review ({
    name: req.body.name,
    semester: req.body.semester,
    year: req.body.year,
    review: req.body.review
  });
  addReview.save((err, addReview) => {
    if (err) {
        res.json({error: err});
    } 
    else {
      res.json(addReview);
    }
  });
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});
