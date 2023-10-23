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


app.get('/post', async (req: any, res: any) => {
  const access_token = "";
  if (!access_token) {
    return res.status(400).send('Access token not found.');
  }

  const mediaUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyO9smXiWw5z6p0ve2QxRoSXbXgny_L9bh94BrKhbire2jW3Ckragd0aTMUXpWd9Pgxg&usqp=CAU';
  const caption = 'Your caption here';

  const postResponse = await axios.post('https://graph.facebook.com/v13.0/me/media', {
    media_url: mediaUrl,
    caption: caption,
    access_token,
  });

  console.log(postResponse.data)

  res.send('Post created successfully!');
});