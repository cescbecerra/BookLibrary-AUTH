const Review = require('../models/review');
const Book = require('../models/book');

exports.addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const review = await Review.create({ user: userId, book: bookId, rating, comment });
    const book = await Book.findById(bookId);
    book.reviews.push(review._id);
    await book.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error al añadir la reseña', error });
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const review = await Review.findOneAndUpdate({ _id: reviewId, user: userId }, { rating, comment }, { new: true });
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reseña', error });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la reseña', error });
  }
};
