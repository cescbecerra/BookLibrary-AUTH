const Book = require('../models/book');

// Controlador para obtener todos los libros
exports.getBooks = async (req, res) => {
  try {
    // Esperar a que se resuelva la Promesa devuelta por Book.find()
    const books = await Book.find();
    // Enviar la respuesta con los libros en formato JSON
    res.json(books);
  } catch (error) {
    // Manejar errores si ocurre un problema al recuperar los libros
    res.status(500).json({ message: 'Error al recuperar los libros', error });
  }
};

// Controlador para obtener un libro por ID
exports.getBookById = (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .populate('reviews')
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }
      res.json(book);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error al recuperar el libro', error });
    });
};


// Controlador para obtener todos los libros por ISBN
exports.getBooksByISBN = (req, res) => {
  const { isbn } = req.params;
  Book.find({ isbn })
    .then(books => {
      if (books.length === 0) {
        return res.status(404).json({ message: 'No se encontraron libros con ese ISBN' });
      }
      res.json(books);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error al recuperar los libros', error });
    });
};
exports.getBookByISBN = (req, res) => {
  const { isbn } = req.params;
  
  Book.findOne({ isbn })
    .populate('reviews') // Solo Solo si tienes una referencia a 'reviews' en el modelo Book
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
      }
      res.json(book);
    })
    .catch(error => {
      res.status(500).json({ message: 'Error al recuperar el libro', error });
    });
};

// Controlador para obtener libros por autor
exports.getBooksByAuthor = async (req, res) => {
  const { author } = req.params;
  console.log('Buscando libros por autor:', author); // Añade este log
  try {
    const books = await Book.find({ author: { $regex: new RegExp(author, 'i') } }); // Búsqueda insensible a mayúsculas y minúsculas
    if (!books.length) {
      console.log('No se encontraron libros para este autor');
      return res.status(404).json({ message: 'No se encontraron libros para este autor' });
    }
    res.json(books);
  } catch (error) {
    console.log('Error al recuperar los libros del autor:', error);
    res.status(500).json({ message: 'Error al recuperar los libros del autor', error });
  }
};

// Controlador para obtener libros por título
exports.getBooksByTitle = async (req, res) => {
  const { title } = req.params;
  console.log('Buscando libros por título:', title); // Añade este log
  try {
    const books = await Book.find({ title: { $regex: new RegExp(title, 'i') } }); // Búsqueda insensible a mayúsculas y minúsculas
    if (!books.length) {
      console.log('No se encontraron libros con este título');
      return res.status(404).json({ message: 'No se encontraron libros con este título' });
    }
    res.json(books);
  } catch (error) {
    console.log('Error al recuperar los libros por título:', error);
    res.status(500).json({ message: 'Error al recuperar los libros por título', error });
  }
};