// Load the http module to create an http server.
const express = require('express')
const productsController = require('./controllers/products')
const e = require('express');

const PORT = 8000

const app = express();

// Middleware
    app.use(express.json())


//Controllers
app
  .get('/hello', (req, res) => {
    res.send('Hello New Paltz, NY!!!')
  })
  .use('/api/v1/products', productsController)

  .use('/', express.static('dist'))


//error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500

  const error = {
    status,
    message: err.message || 'Internal Server Error',
  }
  res.status(status).send(error)
 })

// Listen on port 8000, IP defaults to
//


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});

/*
  Asynchronous patterns in Node.js
  1. Callbacks
  2. Pipeline
  3. Promises
  4. Async/Await
*/

console.log('Hello World!')
/*
Ways to send data to the server:

1. Path Query parameters (GET): http://localhost:8000/api/v1/products?id=1&name=Product%201
2. Query parameters (GET): http://localhost:8000/api/v1/products?id=1&name=Product%201
3. Headers (GET, POST, PATCH): { "session": "abc123" }
3.5 Cookies (GET, POST, PATCH): { "session": "abc123" }
4. Request Body (POST, PATCH): { "name": "Product 1", "price": 10.99 }
4.0 Form Data (POST): { "name": "Product 1", "price": 10.99 }
4.5 Multipart Form Data (POST): { "image": "image.png", "name": "Product 1", "price": 10.99 }
*/

/*
Parts of a url:
1. Protocol: http:// or https://
2. Domain:  www.example.com
3. Port: 8000 (optional, default is 80 for http and 443 for https)
4. Path: /api/v1/products
5. Query parameter: ?id=1&name=Product%201 (optional, starts with ?)
6. Fragment: #section1 (optional, starts with #)

Example: http://localhost:8000/api/v1/products?id=1&name=Product%201#section1
*/

/*
Module Types:
1. CommonJS: require() and module.exports (Node.js default)
  Import: require('./controllers/products')
  Export: module.exports = { router }
2. ES6: import and export (modern JavaScript, supported in Node.js and browsers)
  Import: import productsController from './controllers/products.js'
  Export: export default router
*/