const facebookConfig = require('../config/facebook')
const axiosModule = require('axios')
import express, { Request, Response } from 'express';

import { error } from 'console'
import { database, userCollectionName } from '../database/mongo'

import { User } from '../dto/user'
import { FacebookPagesList, ExceptionResponse } from '../dao/main'
import logger from '../utils/logger';

let userToken = ""

const FACEBOOK_BASE_URL = 'https://graph.facebook.com'

const collection = database.collection(userCollectionName);

/**
 * 
  Untested code please do test and remove the comment before use
 */
async function getPagesFromUserName(userName: string, response: Response) {
  const user = await collection.findOne({ userName: userName })

  if (user && user.facebookAccessToken) {
    axiosModule.get(`${FACEBOOK_BASE_URL}/v15.0/me/accounts?access_token=${user.facebookAccessToken}`).then(async (facebookResponse: any) => {
      const namesOfPages: string[] = facebookResponse?.data?.data.map((instance: any) => instance.name)

      const responseOfList: FacebookPagesList = {
        names: namesOfPages
      }

      return response.json(responseOfList)

    })
      .catch((error: any) => {
        return response.json(error)
      })
  }

  const exceptionResponse: ExceptionResponse = {
    errorMessage: "Unable to find facebook access token",
    errorCode: "USER_NOT_REGISTERED"
  }
  return response.status(400).json(exceptionResponse);

}

async function isConnected(userName: string): Promise<boolean> {
  const user = await collection.findOne({ userName: userName })
  let isConnected = false;

  if (user && user.facebookAccessToken) {

    const accessToken = user.facebookAccessToken

    await axiosModule.get(`${FACEBOOK_BASE_URL}/v18.0/me?access_token=${accessToken}&fields=id,name`)
      .then((response: any) => {
        if (response && response.data && response.data.id) {
          isConnected = true;
        }
      })
      .catch((error: any) => {
      })
  }
  return isConnected;
}

function auth(request: {}, response: any) {
  return response.redirect(`${FACEBOOK_BASE_URL}/v15.0/dialog/oauth?response_type=code&client_id=${facebookConfig.client_id}&redirect_uri=${facebookConfig.redirect_uri}&state=shantanu16101998@gmail.com`)
}

async function authCallback(request: any, response: any) {

  const code = request?.query?.code;
  const state = request?.query?.state;


  axiosModule.post(`${FACEBOOK_BASE_URL}/v15.0/oauth/access_token?code=${code}&client_id=${facebookConfig.client_id}&client_secret=${facebookConfig.client_secret}&redirect_uri=${facebookConfig.redirect_uri}`)
    .then((response: any) => {
      // Handle the response here
      logger.debug(response?.data);
      const access_token = response?.data?.access_token;

      userToken = access_token;

      axiosModule.get(`${FACEBOOK_BASE_URL}/v18.0/me?fields=id,name&access_token=${access_token}`).then(async (responseUser: any) => {


        const user: User = {
          userName: state,
          facebookAccessToken: access_token
        }

        try {
          const _ = await collection.insertOne(user);
          logger.debug(`documents successfully inserted.\n`);
        } catch (err) {
          logger.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        }
      })

    })
    .catch((error: any) => {
      logger.error(error);
    });


  response.send('Authentication successful! You can now post on behalf of the user.');
}

export async function getPages(userName: string, response: Response) {
  const user = await collection.findOne({ userName: userName });

  if (user && user.facebookAccessToken) {
    axiosModule
      .get(`${FACEBOOK_BASE_URL}/v15.0/me/accounts?access_token=${user.facebookAccessToken}`)
      .then((facebookResponse: any) => {
        response.json(facebookResponse?.data);
      })
      .catch((error: any) => {
        response.status(500).json(error);
      });
  } else {
    const exceptionResponse: ExceptionResponse = {
      errorMessage: "Unable to find facebook access token",
      errorCode: "USER_NOT_REGISTERED"
    };
    response.status(200).json(exceptionResponse)
  }

  return response
}

function postInPage(request: any, response: any) {
  const facebookPostRequestBody = {
    message: request?.body?.message,
    link: request?.body?.link
  }

  axiosModule.post(`${FACEBOOK_BASE_URL}/v15.0/358067367943218/feed?access_token=${request?.body?.access_token}`, facebookPostRequestBody)
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
  isConnected,
  getPagesFromUserName
};