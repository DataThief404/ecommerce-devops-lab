const express = require('express');
const mongoose = require('mongoose');

const app = express();

const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Phone', price: 800 }
];

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));

app.get('/', (req, res) => {
  let html = '<h1>E-Commerce Store</h1><ul>';

  products.forEach(p => {
    html += `<li>${p.name} - $${p.price}</li>`;
  });

  html += '</ul>';

  res.send(html);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});