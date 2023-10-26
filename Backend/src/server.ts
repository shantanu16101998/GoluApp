const express = require('express');
const axios = require('axios')
import bodyParser from 'body-parser';
const app = express();
import logger from './utils/logger'

const port = 3000;

app.use(bodyParser.json());

const facebookRoutes = require('./controller/facebook');
const mainRoutes = require('./controller/main')

// Use the Facebook API routes
app.use('/facebook', facebookRoutes);
app.use('/', mainRoutes);


app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

