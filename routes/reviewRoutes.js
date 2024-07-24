const express = require('express');
const { addReview, updateReview, deleteReview,getReviewById } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:bookId', protect, addReview);
router.post('/add', protect, addReview);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);
router.get('/:reviewId', getReviewById); // Nueva ruta para obtener reseña por ID

module.exports = router;
