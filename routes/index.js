const express = require('express');
const router = express.Router();

// GET 200: Returns the currently authenticated user
router.get('/users', (req, res) => {

});

// POST 201: Creates a user, sets the Location header to "/", and returns no content
router.post('/users', (req,res) => {

});

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