const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

const products = [
  { name: 'Laptop',      price: 1200, category: 'Electronics', stock: 15 },
  { name: 'Phone',       price: 800,  category: 'Electronics', stock: 30 },
  { name: 'Headphones',  price: 150,  category: 'Audio',       stock: 50 },
  { name: 'Keyboard',    price: 95,   category: 'Accessories', stock: 25 },
  { name: 'Monitor',     price: 450,  category: 'Electronics', stock: 10 },
  { name: 'Mouse',       price: 45,   category: 'Accessories', stock: 60 },
];

app.get('/', (req, res) => {
  const rows = products.map(p => `
    <tr>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price}</td>
      <td><span class="stock">${p.stock} units</span></td>
      <td><button onclick="alert('Added ${p.name} to cart!')">Add to Cart</button></td>
    </tr>
  `).join('');

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Commerce Store</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    header h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 800;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    header p {
      color: rgba(255,255,255,0.85);
      font-size: 1rem;
      margin-top: 0.5rem;
    }

    .card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(90deg, #667eea, #764ba2);
      padding: 1.2rem 1.5rem;
      color: white;
      font-size: 1rem;
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead th {
      background: #f8f9ff;
      padding: 1rem 1.2rem;
      text-align: left;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #667eea;
      border-bottom: 2px solid #e8ecff;
    }

    tbody tr {
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.15s;
    }

    tbody tr:hover {
      background: #fafbff;
    }

    tbody td {
      padding: 1rem 1.2rem;
      font-size: 0.9rem;
      color: #333;
    }

    tbody td:first-child {
      font-weight: 600;
      color: #1a1a2e;
    }

    .stock {
      background: #e8fff0;
      color: #22c55e;
      padding: 0.25rem 0.7rem;
      border-radius: 100px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    button {
      background: linear-gradient(90deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 0.45rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 600;
      transition: opacity 0.2s;
    }

    button:hover { opacity: 0.85; }

    footer {
      text-align: center;
      color: rgba(255,255,255,0.7);
      margin-top: 1.5rem;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🛒 E-Commerce Store</h1>
      <p>DevOps CI/CD Lab — Terraform + Ansible + Docker + GitHub Actions</p>
    </header>

    <div class="card">
      <div class="card-header">📦 Product Catalog — ${products.length} items</div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <footer>
      <p>Deployed with ❤️ using AWS EC2 + ALB + Docker + GitHub Actions</p>
    </footer>
  </div>
</body>
</html>`);
});

app.listen(3000, () => console.log('App running on port 3000'));