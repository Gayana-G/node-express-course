const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static("static"));

// Route to serve the game HTML form
app.get("/guessgame", (req, res) => {
    res.send(`
      <h1>Guess the Number Game</h1>
      <p>Guess a number between 1 and 10:</p>
      <form action="/guess" method="GET">
        <input type="number" name="guess" min="1" max="10" required>
        <button type="submit">Submit Guess</button>
      </form>
    `);
  });
  
  // Route to handle the user's guess
  app.get("/guess", (req, res) => {
    const secretNumber = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
    const userGuess = parseInt(req.query.guess);
  
    if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= 10) {
      if (userGuess === secretNumber) {
        res.send(`
          <h2>Congratulations! You guessed the secret number (${secretNumber})!</h2>
          <p><a href="/guessgame">Play Again</a></p>
        `);
      } else {
        res.send(`
          <h2>Sorry, that's not correct. The secret number was ${secretNumber}.</h2>
          <p><a href="/guessgame">Try Again</a></p>
        `);
      }
    } else {
      res.send(`
        <h2>Please enter a valid number between 1 and 10.</h2>
        <p><a href="/guessgame">Try Again</a></p>
      `);
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });