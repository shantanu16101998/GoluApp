const express = require('express');
const axios = require('axios')
import bodyParser from 'body-parser';
const app = express();

const port = 3000;

app.use(bodyParser.json());


// Import your Facebook API routes
const facebookRoutes = require('./controller/facebook');

// Use the Facebook API routes
app.use('/facebook', facebookRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

