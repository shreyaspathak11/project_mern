// importing the required modules
const express = require('express')
const mongoose = require('mongoose');
// Importing the passport library and the GoogleStrategy For Google OAuth2.0
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import the express-session module
const session = require('express-session');   
// Importing the User model
const User = require('./models/user.model');      
//Connect to MongoDB
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

// express app and port
const app = express()
const port = 5000


connectToDB()              // call the connectToDB function


// Login with Google  

passport.use(
  new GoogleStrategy(
    {
      clientID: '678252387684-lrt3j7dvlqjs81g8sa107qerdp5pked6.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });  // find the user in the database

        if (user) {
          // User already exists in the database
          return done(null, user);
        } else {
          console.log(profile);   // print the profile
          // User doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          });

          await user.save();      // save the user to the database

          return done(null, user);  // return the user
        }
      } catch (error) {               // if error, then print the error
        console.error('Error saving user to database:', error);
        return done(error, null);     // return the error
      }
    }
  )
);


// serialize and deserialize the user
app.use(
  session({
    secret: 'dummy',
    resave: false,
    saveUninitialized: false,
  })
);
//initialize passport
app.use(passport.initialize());
//use passport session
app.use(passport.session());
// authenticate the user
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));  

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the homepage
    res.redirect('/');
  }
);

//Routing for the homepage

app.get('/', (req, res) => {     // route for the homepage
  res.render('index', {
    user: req.user,
  });
});


// listen on the port
app.listen(port, () => {      
  console.log(`Server Running on port ${port}`)
})


