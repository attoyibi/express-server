const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const faker = require("faker");
const { check, validationResult } = require("express-validator");
const cors = require("cors"); // Import the cors package

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

let users = Array.from({ length: 10 }, () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
})).concat([{ username: "user1", password: "password1" }]); // Add default user

app.post(
  "/register",
  [
    check("username").notEmpty().withMessage("Username cannot be empty"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least  5 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    users.push({ username, password });
    res.status(200).json({
      success: true,
      username: username,
      message: "Registration successful",
    });
  }
);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`Attempting login with username: ${username}`); // Log the username

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    console.log(`Failed login attempt with username: ${username}`); // Log the failure
    return res.status(401).json({
      success: false,
      message: `Authentication failed. ${username}`,
    });
  }

  const token = jwt.sign({ username }, "your_secret_key", { expiresIn: "1h" });
  console.log(`Successful login with username: ${username} ${password}`); // Log the success

  res.json({
    success: true,
    message: "Login successful",
    username: username,
    token,
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

app.get("/user", (req, res) => {
  res.json(users);
});

app.get("/", (req, res) => {
  res.send(`
     <h1> Selamat, Anda Berhasil Menginstall Dummy Server Login dan Register </h1>  
     <ul>
      <li><a href="/user">List Semua User</a></li>
       <li><a href="/register">"POST" Register</a></li>
       <li><a href="/login">"POST" Login</a></li>
     </ul>
  `);
});

app.listen(3000, () => console.log("Server started on port  3000"));
