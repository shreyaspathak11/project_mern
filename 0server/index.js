// Import dependencies
const express = require("express");
const database = require("./utils/database");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Import routes
const authRoutes = require("./routes/auth");

// Create Express app
const app = express();

// Connect to MongoDB
database.connect();

// Configure session middleware
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "678252387684-lrt3j7dvlqjs81g8sa107qerdp5pked6.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Perform any additional processing or save user data to MongoDB
      console.log(profile);
      return done(null, profile);
    }
  )
);

// Configure Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Define routes
app.use("/auth", authRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
