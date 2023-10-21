const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const client_id = '234940275966834';
const client_secret = '17e887607414085b61f64b3d8d60123e';
const redirect_uri = 'https://www.google.com';

let userTokens = {};

app.get('/', (req, res) => {
  res.send('Hello Instagram API!');
});

// Step 1: Redirect user to Instagram for authentication
app.get('/auth', (req, res) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`);
});

// Step 2: Handle Instagram callback to obtain access token
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  const response = await axios.post('https://api.instagram.com/oauth/access_token', {
    client_id,
    client_secret,
    grant_type: 'authorization_code',
    redirect_uri,
    code,
  });

//   const access_token = response.data.access_token;
  print(response)

  // In a real application, you should store the access token securely.
//   userTokens[req.query.state] = access_token;

  res.send('Authentication successful! You can now post on behalf of the user.');
});

// Step 3: Post on behalf of the user
app.get('/post', async (req, res) => {
  const access_token = userTokens[req.query.state];
  if (!access_token) {
    return res.status(400).send('Access token not found.');
  }

  const mediaUrl = 'URL_OF_THE_MEDIA_TO_BE_POSTED';
  const caption = 'Your caption here';

  const postResponse = await axios.post('https://graph.instagram.com/v13.0/me/media', {
    media_url: mediaUrl,
    caption: caption,
    access_token,
  });

  res.send('Post created successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
