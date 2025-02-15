const express = require('express');
const app = express();
const PORT = 3000;

let products = [
    { id: 1, itemName: 'Laptop', price: 15000000 },
    { id: 2, itemName: 'Mouse', price: 300000 }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World  API');
});

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Add a new product
app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        itemName: req.body.itemName,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

    products[productIndex] = {
        ...products[productIndex],
        itemName: req.body.itemName,
        price: req.body.price
    };

    res.json(products[productIndex]);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    const deletedProduct = products.splice(index, 1)[0];
    res.json(deletedProduct);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
