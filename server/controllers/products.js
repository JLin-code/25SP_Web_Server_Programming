const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    {
            id: 1,
            name: 'Product 1',
            price: 10.99
    },
    {
            id: 2,
            name: 'Product 2',
            price: 20.99
    }, 
    {
            id: 3,
            name: 'Product 3',
            price: 30.99
    }
  )}
