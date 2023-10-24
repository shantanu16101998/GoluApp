const facebookConfig = require('../config/facebook')
const axiosModule = require('axios')

import { error } from 'console'
import { database, userCollectionName } from '../database/mongo'

import { User } from '../dto/user'

let userToken = ""

const collection = database.collection(userCollectionName);

async function isConnected(userName: String): Promise<boolean> {
  const user = await collection.findOne({ userName: userName })
  let isConnected = false;
  console.log(user)

  if (user && user.facebookAccessToken) {

    const accessToken = user.facebookAccessToken

    await axiosModule.get('https://graph.facebook.com/v18.0/me?access_token=' + accessToken + '&fields=id,name')
    .then((response: any) => {
      if(response && response.data && response.data.id)
      {
        isConnected =  true;
      }
    })
    .catch((error:any) => {
    })
  }
  return isConnected;
}

function auth(request: {}, response: any) {
  return response.redirect('https://www.facebook.com/v15.0/dialog/oauth?response_type=code&client_id=' + facebookConfig.client_id + '&redirect_uri=' + facebookConfig.redirect_uri + '&state=shantanu16101998@gmail.com')
}

async function authCallback(request: any, response: any) {

  console.log("request is",request.query)
  const code = request.query.code;
  const state = request.query.state;


  axiosModule.post('https://graph.facebook.com/v15.0/oauth/access_token?code=' + code + '&client_id=' + facebookConfig.client_id + '&client_secret=' + facebookConfig.client_secret + '&redirect_uri=' + facebookConfig.redirect_uri)
    .then((response: any) => {
      // Handle the response here
      console.log(response.data);
      const access_token = response.data.access_token;

      userToken = access_token;

      axiosModule.get('https://graph.facebook.com/v18.0/me?fields=id,name&access_token=' + access_token).then(async (responseUser: any) => {


        const user: User = {
          userName: state,
          facebookAccessToken: access_token
        }

        try {
          const insertOneResult = await collection.insertOne(user);
          console.log(`documents successfully inserted.\n`);
        } catch (err) {
          console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        }
      })

    })
    .catch((error: any) => {
      console.error(error);
    });


  response.send('Authentication successful! You can now post on behalf of the user.');
}

function getPages(request: any, response: any) {
  axiosModule.get('https://graph.facebook.com/v15.0/me/accounts?access_token=' + request.body.access_token).then(async (facebookResponse: any) => {
    response.json(facebookResponse.data)

  })
    .catch((error: any) => {
      response.json(error)
    })
}

function postInPage(request: any, response: any) {
  const facebookPostRequestBody = {
    message: request.body.message,
    link: request.body.link
  }

  axiosModule.post('https://graph.facebook.com/v15.0/358067367943218/feed?access_token=' + request.body.access_token, facebookPostRequestBody)
    .then(async (facebookResponse: any) => {
      response.json(facebookResponse.data)
    })
    .catch((error: any) => {
      response.json(error)
    })
}


module.exports = {
  auth,
  authCallback,
  getPages,
  postInPage,
  isConnected
};