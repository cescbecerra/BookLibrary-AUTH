const Review = require('../models/review');
const Book = require('../models/book');

// Controlador para agregar una reseña
exports.addReview = async (req, res) => {
  const { user, book, rating, comment } = req.body;

  try {
    const newReview = new Review({ user, book, rating, comment });
    const savedReview = await newReview.save();
    await Book.findByIdAndUpdate(book, { $push: { reviews: savedReview._id } });
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la reseña', error });
  }
};

// Controlador para actualizar una reseña
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
    if (!updatedReview) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error });
  }
};

// Controlador para eliminar una reseña
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });

    // Opcional: También eliminar la reseña de la lista de reseñas del libro
    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: reviewId } });

    res.status(200).json({ message: 'Reseña eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error });
  }
};

