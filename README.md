# 📦 E-commerce Catalog API (Express + MongoDB)

A simple RESTful API for managing products with **nested variants** using **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## ✨ Features
- ➕ Create a new product with variants  
- 📖 Read all products  
- 🔍 Read products by category  
- 🔍 Read products by variant color  
- 🗑️ Delete product by ID  

---

## 🛠 Tech Stack
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [Mongoose](https://mongoosejs.com/)  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-catalog-api.git
cd ecommerce-catalog-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start MongoDB server
Ensure MongoDB is running locally at:
```
mongodb://127.0.0.1:27017/ecommerce
```

Example (Linux/macOS):
```bash
mongod
```

### 4. Run the server
```bash
node index.js
```

Or with nodemon (auto-restart):
```bash
npx nodemon index.js
```

### 5. Server will be available at
```
http://localhost:3000
```

---

## 📌 API Endpoints

### 1. ➕ Create Product
**POST** `/products`

**Body (JSON):**
```json
{
  "name": "Adidas Hoodie",
  "price": 150,
  "category": "Apparel",
  "variants": [
    { "color": "Green", "size": "M", "stock": 8 },
    { "color": "Black", "size": "L", "stock": 5 }
  ]
}
```

**Response (201 Created):**
```json
{
  "_id": "64f9a1b2e3a4c5d6f7a8b901",
  "name": "Adidas Hoodie",
  "price": 150,
  "category": "Apparel",
  "variants": [
    { "color": "Green", "size": "M", "stock": 8 },
    { "color": "Black", "size": "L", "stock": 5 }
  ]
}
```

---

### 2. 📖 Get All Products
**GET** `/products`

**Response (200 OK):**
```json
[
  {
    "_id": "64f9a1b2e3a4c5d6f7a8b901",
    "name": "Nike Jacket",
    "price": 200,
    "category": "Apparel",
    "variants": [
      { "color": "Black", "size": "M", "stock": 10 },
      { "color": "Gray", "size": "L", "stock": 5 }
    ]
  },
  {
    "_id": "64f9a1b2e3a4c5d6f7a8b902",
    "name": "Running Shoes",
    "price": 120,
    "category": "Footwear",
    "variants": [
      { "color": "Red", "size": "9", "stock": 7 },
      { "color": "Blue", "size": "10", "stock": 4 }
    ]
  }
]
```

---

### 3. 🔍 Get Products by Category
**GET** `/products/category/:category`

**Example:**
```
/products/category/Apparel
```

**Response (200 OK):**
```json
[
  {
    "_id": "64f9a1b2e3a4c5d6f7a8b901",
    "name": "Nike Jacket",
    "price": 200,
    "category": "Apparel",
    "variants": [
      { "color": "Black", "size": "M", "stock": 10 },
      { "color": "Gray", "size": "L", "stock": 5 }
    ]
  }
]
```

---

### 4. 🔍 Get Products by Variant Color
**GET** `/products/by-color/:color`

**Example:**
```
/products/by-color/Blue
```

**Response (200 OK):**
```json
[
  {
    "_id": "64f9a1b2e3a4c5d6f7a8b902",
    "name": "Running Shoes",
    "price": 120,
    "category": "Footwear",
    "variants": [
      { "color": "Red", "size": "9", "stock": 7 },
      { "color": "Blue", "size": "10", "stock": 4 }
    ]
  }
]
```

---

### 5. 🗑️ Delete Product by ID
**DELETE** `/products/:id`

**Response (200 OK):**
```json
{
  "message": "Product deleted",
  "product": {
    "_id": "64f9a1b2e3a4c5d6f7a8b902",
    "name": "Running Shoes",
    "price": 120,
    "category": "Footwear",
    "variants": [
      { "color": "Red", "size": "9", "stock": 7 },
      { "color": "Blue", "size": "10", "stock": 4 }
    ]
  }
}
```

---

## 🧪 Testing with Postman

1. Open **Postman** and set the base URL:  
```
http://localhost:3000
```

2. Available requests:
- `POST /products` → Create product  
- `GET /products` → Get all products  
- `GET /products/category/:category` → Get products by category  
- `GET /products/by-color/:color` → Get products by variant color  
- `DELETE /products/:id` → Delete product by ID  

3. Set request **Body → raw → JSON** for POST requests.  
4. For DELETE or GET by ID, copy the `_id` value returned in POST response.  

---

## 🧰 Troubleshooting
- **MongoDB connection error** → ensure `mongod` service is running.  
- **CastError (ObjectId)** → check you passed a valid MongoDB `_id`.  
- **Validation error** → ensure `name`, `price`, `category`, and variant details are provided correctly.

- ## 📷 Output Screenshots

![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233147.png)
![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233155.png)
![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233331.png)
![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233622.png)
![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233645.png)
![Screenshot](/OUTPUT/Screenshot%202025-10-05%20233653.png)

---


