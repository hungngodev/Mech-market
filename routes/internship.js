const express = require('express');
const router = express.Router();
const internships = require('../controllers/internships');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInternship } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const Internship = require('../models/internship');

router.route('/')
    .get(catchAsync(internships.index))
    .post(isLoggedIn, upload.array('image'), validateInternship, catchAsync(internships.createInternship))


router.get('/new', isLoggedIn, internships.renderNewForm)

router.route('/:id')
    .get(catchAsync(internships.showInternship))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateInternship, catchAsync(internships.updateInternship))
    .delete(isLoggedIn, isAuthor, catchAsync(internships.deleteInternship));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(internships.renderEditForm))



module.exports = router;