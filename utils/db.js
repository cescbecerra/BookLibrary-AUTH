const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar la base de datos', error);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports = connectDB;
