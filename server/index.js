const express = require('express')
const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello New Paltz, NY!!!')
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})



console.log('Server Good To Go!')