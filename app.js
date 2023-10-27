const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const router = require('./src/router')

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
