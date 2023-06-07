const mongoose = require('mongoose');

// Connect to MongoDB
const connect = () => {
  mongoose
    .connect('mongodb+srv://dummy123:dummy123@bitbazaar.imeimd6.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = { connect };
