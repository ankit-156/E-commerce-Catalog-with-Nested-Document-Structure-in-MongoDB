const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schema for variants
const variantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
});

// Define schema for products
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    variants: [variantSchema],
});

const Product = mongoose.model('Product', productSchema);

// Sample data insertion (run once)
async function insertSampleData() {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany([
            {
                name: 'Nike Jacket',
                price: 200,
                category: 'Apparel',
                variants: [
                    { color: 'Black', size: 'M', stock: 10 },
                    { color: 'Gray', size: 'L', stock: 5 },
                ],
            },
            {
                name: 'Smartphone',
                price: 600,
                category: 'Electronics',
                variants: [],
            },
            {
                name: 'Running Shoes',
                price: 120,
                category: 'Footwear',
                variants: [
                    { color: 'Red', size: '9', stock: 7 },
                    { color: 'Blue', size: '10', stock: 4 },
                ],
            },
        ]);
        console.log('Sample data inserted');
    }
}

// Routes

// 1. Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 2. Get products by category
app.get('/products/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 3. Get products by variant color
app.get('/products/by-color/:color', async (req, res) => {
    try {
        const color = req.params.color;
        const products = await Product.find({ 'variants.color': color });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 4. Add a new product (POST)
app.post('/products', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body cannot be empty' });
        }

        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product added', product: savedProduct });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 5. Delete a product by ID (DELETE)
app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted', product });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await insertSampleData();
});
