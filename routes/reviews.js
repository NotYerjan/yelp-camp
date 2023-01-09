const express = require("express")
const router = express.Router({ mergeParams: true })

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')

const review = require('../controllers/reviews')
const catchAsync = require('../utils/catchAsync')

router.post('/', isLoggedIn, validateReview, catchAsync(review.postNewReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteTheReview))

module.exports = router