// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router } = require('./routers/adminRouter');
const cors = require('cors');


const app = express();
require('dotenv').config();

app.use(cors());
const port = 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());

app.use('/admin/api', router); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
