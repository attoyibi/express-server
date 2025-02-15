const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample product data
let products = [
    { id: 1, itemName: 'Laptop', price: 15000000 },
    { id: 2, itemName: 'Mouse', price: 300000 }
];

// Middleware for standardized API response
const apiResponse = (req, res, next) => {
    res.success = (data, message = 'Success') => {
        res.status(200).json({ status: 'success', message, data });
    };

    res.error = (message = 'Error', statusCode = 400) => {
        res.status(statusCode).json({ status: 'error', message });
    };

    next();
};

app.use(apiResponse);

// Get all products
app.get('/products', (req, res) => {
    res.success(products, 'Products retrieved successfully');
});

// Get product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.error('Product not found', 404);

    res.success(product, 'Product retrieved successfully');
});

// Add a new product
app.post('/products', (req, res) => {
    const { itemName, price } = req.body;
    if (!itemName || !price) return res.error('Item name and price are required', 400);

    const newProduct = {
        id: products.length + 1,
        itemName,
        price
    };
    products.push(newProduct);
    res.status(201).json({ status: 'success', message: 'Product created successfully', data: newProduct });
});

// Update a product
app.put('/products/:id', (req, res) => {
    const { itemName, price } = req.body;
    if (!itemName || !price) return res.error('Item name and price are required', 400);

    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.error('Product not found', 404);

    products[productIndex] = { ...products[productIndex], itemName, price };
    res.success(products[productIndex], 'Product updated successfully');
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.error('Product not found', 404);

    products.splice(productIndex, 1);
    res.status(204).send();
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.error('Internal Server Error', 500);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
