const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(
  session({
    secret: "bharath_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Temporary storage
let users = [];

// ================= ROUTES =================

// Home (Protected)
app.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "index.html"));
});

// Signup Page
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

// Signup Logic
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(user => user.username === username);
  if (exists) {
    return res.send("User already exists. <a href='/signup'>Try Again</a>");
  }

  users.push({ username, password });
  res.redirect("/login");
});

// Login Page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Login Logic
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const validUser = users.find(
    user => user.username === username && user.password === password
  );

  if (validUser) {
    req.session.user = username;
    res.redirect("/");
  } else {
    res.send("Invalid Credentials. <a href='/login'>Try Again</a>");
  }
});

// Profile
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.sendFile(path.join(__dirname, "profile.html"));
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

//  IMPORTANT FOR VERCEL
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});