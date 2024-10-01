const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.get('/', (req, res) => {
  const data = { message: 'Hello from Node.js backend!' };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}