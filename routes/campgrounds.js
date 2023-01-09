const express = require('express')
const router = express.Router()

const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})

const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

const campgrounds = require('../controllers/campgrounds')

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.postNewCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewCampgroundForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showTheCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateTheCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteTheCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editTheCampgroundForm))


module.exports = router