const Book = require('../models/book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar los libros', error });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate('reviews');
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar el libro', error });
  }
};
