const express = require('express')
const productsController = require('./controllers/products')   
const PORT = 8000;

const app = express();

app
  .get('/', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})
  .use('/products', productsController)


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})



console.log('Server Good To Go!')