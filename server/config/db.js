const mongoose = require('mongoose'); // import mongoose
let isConnected = false; // track the connection

const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {           // if already connected, then don't connect again, just return
    console.log('MongoDB is already connected');
    return;
  }
//else if not connected, then connect
  try {                       // try to connect to the database
    await mongoose.connect("mongodb+srv://dummy123:dummy123@bitbazaar.imeimd6.mongodb.net/" , {
      dbName: "Mind_Musings",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;         // if connection established, then set the isConnected to true

    console.log('MongoDB connected')
  } catch (error) {              // if connection failed, then print the error
    console.log(error);
  }
}

module.exports = connectToDB;    // export the connectToDB function