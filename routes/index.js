const express = require('express');
const router = express.Router();
const User = require('../models').User;
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');


/* Function to check for SequelizeValidationError */
function checkError(error, req, res){
    if(error.name === 'SequelizeValidationError'){
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
      res.status(400).json({ errors });
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

// Function to authenticate users
async function authenticateUser(req, res, next) {
    let message = null;
    const credentials = auth(req);
    if (credentials) {
        let user = await User.findAll({where: {emailAddress: credentials.name}});
        // console.log(user);
        if (user.length > 0) {
            user = user[0].dataValues;
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for email address: ${user.emailAddress}`);
                req.currentUser = user;
            } else {
                message = `Authentication failure for email address: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for email address: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
}


// GET 200: Returns the currently authenticated user
router.get('/users', authenticateUser, (req, res) => {
    const user = req.currentUser;
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
    });
});

// POST 201: Creates a user, sets the Location header to "/", and returns no content
router.post('/users', asyncHandler(async(req, res) => {
    const user = req.body;
    user.password = bcryptjs.hashSync(user.password);
    await User.create(user);
    res.location('/');
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