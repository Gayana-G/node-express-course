// Function to fetch products from the server based on user input
async function fetchProducts() {
    // Get the search term entered by the user
    const searchTerm = document.getElementById('searchInput').value;

    try {
        // Construct the URL with the search term as a query parameter
        const url = `/api/v1/query?search=${encodeURIComponent(searchTerm)}&limit=5`;
        
        // Fetch products from the server
        const response = await fetch(url);
        
        // Handle errors
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        // Parse the response as JSON
        const products = await response.json();
        
        // Display the fetched products on the webpage
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
    }
}

// Function to display products on the webpage
function displayProducts(products) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = `${product.name} - $${product.price}`;
        productListDiv.appendChild(productElement);
    });
}

// Attach the fetchProducts function to the search form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    fetchProducts();
});
