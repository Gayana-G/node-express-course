// Import the express module
const express = require('express');
const { products } = require("./data");

// Create an Express application
const app = express();

console.log('Starting the server...');

// Middleware to serve static files
app.use(express.static('./public'));

console.log('Static middleware setup completed');
// Route handlers (can be added later)
app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});

app.get('/api/v1/products/:productID', (req, res) => {
  const {productID} = req.params;

  const product = products.find(p => p.id === parseInt(productID));
  if (!product) {
    return res.status(404).json({ message: 'That product was not found.' });
  }

  res.json(product);
})
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

// app.post('/some-route', (req, res) => {
//   res.send('POST request to the homepage');
// });

// Handle 404 - Page Not Found
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Tell the server to listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
