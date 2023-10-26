const express = require('express');
const axios = require('axios')
import bodyParser from 'body-parser';
const app = express();

const port = 3000;

app.use(bodyParser.json());

const facebookRoutes = require('./controller/facebook');
const mainRoutes = require('./controller/main')

// Use the Facebook API routes
app.use('/facebook', facebookRoutes);
app.use('/', mainRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

