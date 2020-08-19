const express = require('express');
const router = express.Router();
const User = require('../models').User;


/* Function to check for SequelizeValidationError */
function checkError(error, req, res){
    if(error.name === 'SequelizeValidationError'){
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
      return true;
    } else {
      return false;
    }
  }

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        if (checkError(error, req, res)) {
          return;
        } else {
          next();  
          throw error;
        }
      }
    }
  }


// GET 200: Returns the currently authenticated user
router.get('/users', (req, res) => {

});

// POST 201: Creates a user, sets the Location header to "/", and returns no content
router.post('/users', asyncHandler(async(req, res) => {
    await User.create(req.body);
    res.status(201).end();
}));

// GET 200: Returns a list of courses (including the user that owns each course)
router.get('/courses', (req, res) => {

});

// GET 200: Returns a course (including the user that owns the course) for the provided course ID
router.get('/courses/:id', (req, res) => {

});

// POST 201: Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/courses', (req, res) => {

});

// PUT 204: Updates a course and returns no content
router.put('/courses/:id', (req, res) => {

});

// DELETE 204: Deletes a course and returns no content
router.delete('/courses/:id', (req, res) => {

});

module.exports = router;