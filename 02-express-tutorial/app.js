const express = require('express');
const cookieParser = require('cookie-parser');
const { products, people } = require('./data');
const peopleRouter = require('./routes/people');

const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

console.log('Starting the server...');

// Logger middleware function
function logger(req, res, next) {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next();
}

// Middleware for authentication
const auth = (req, res, next) => {
  const userName = req.cookies.name;
  if (userName) {
    req.user = userName;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Use logger middleware for /path1 and /path2 only
app.use(["/path1", "/path2"], logger);

// Middleware to serve static files
app.use(express.static('./methods-public'));

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log('Static middleware setup completed');

// Route handlers
app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});

app.get('/api/v1/products/:productID', (req, res) => {
  const { productID } = req.params;

  const product = products.find(p => p.id === parseInt(productID));
  if (!product) {
    return res.status(404).json({ message: 'That product was not found.' });
  }

  res.json(product);
});

// Route to handle retrieving products based on query parameters
app.get('/api/v1/query', (req, res) => {
  const { search, limit, maxPrice } = req.query;

  // Filtering products based on search criteria
  let filteredProducts = products;
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // Filtering products based on maxPrice criteria
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= parseFloat(maxPrice)
    );
  }

  // Limiting the number of results
  let limitedProducts = filteredProducts;
  if (limit) {
    limitedProducts = filteredProducts.slice(0, parseInt(limit));
  }

  // Respond with the filtered and limited products
  res.json(limitedProducts);
});

// Use the people router
app.use('/api/v1/people', peopleRouter);

// Path-specific routes
app.get('/path1', (req, res) => {
  res.send('Welcome to Path 1');
});

app.get('/path2', (req, res) => {
  res.send('Welcome to Path 2');
});

// POST route to log in
app.post('/logon', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.cookie('name', name);
    res.status(201).json({ message: `Hello, ${name}!` });
  } else {
    res.status(400).json({ message: 'Please provide a name' });
  }
});

// DELETE route to log off
app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ message: 'User logged off' });
});

// GET route to test authentication
app.get('/test', auth, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user}!` });
});

// Handle 404 - Page Not Found
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
// Tell the server to listen on PORT 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
