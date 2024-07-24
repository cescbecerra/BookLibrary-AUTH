const express = require('express');
const {
  getBooks,
  getBookById,
  getBooksByISBN,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
} = require('../controllers/bookController');

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getBooks);

// Ruta para obtener un libro por ID
router.get('/:id', getBookById);

// Ruta para obtener todos los libros por ISBN
router.get('/isbn/:isbn', getBooksByISBN);

// Ruta para obtener un libro por ISBN
router.get('/isbn/single/:isbn', getBookByISBN);

// Ruta para obtener libros por autor
router.get('/author/:author', getBooksByAuthor);

// Ruta para obtener por título
router.get('/title/:title', getBooksByTitle); 

module.exports = router;
