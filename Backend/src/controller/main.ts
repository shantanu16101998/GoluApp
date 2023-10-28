const expressMain = require('express');
const router = expressMain.Router();
import {
    tokenRequest,
    tokenResponse,
    getPlatformRequest,
    getPlatformResponse,
    getPostRequest,
    getPostResponse,
    connectRequest,
    connectResponse,
    putAPostRequest,
    putAPostResponse
} from '../dao/main';

import logger from '../utils/logger';

const facebookService = require('../service/facebook');
const mainService = require('../service/main');

import { Request, Response } from 'express';
import { ExceptionResponse } from '../dao/main'

router.get('/', async (req: Request, res: Response) => {
    const response = "Welcome to Golu App"
    logger.info('GET: /');
    res.status(200).json(response)
})


router.post('/auth/token', async (req: tokenRequest, res: tokenResponse) => {
    logger.info('GET: /auth/token');
});

router.get('/getPlatforms', async (req: Request, res: Response) => {
    try {
        logger.info('GET: /getPlatforms');
        const body: getPlatformRequest = req.body;
        logger.debug('Getting platforms');
        const response: getPlatformResponse = {
            platformData: [
                {
                    platform: 'Facebook',
                    isConnected: await facebookService.isConnected(body.jwtToken)
                }
            ]
        };
        res.json(response);
    } catch (e) {
        logger.error(e);
        if (typeof e === 'string') {
            const exceptionResponse: ExceptionResponse = {
                errorMessage: e,
                errorCode: 'API_CALL_ERROR'
            };
            res.status(500).json(exceptionResponse); 

        }
        else if (typeof e === "object" && e != null) {
            const exceptionResponse: ExceptionResponse = {
                errorMessage: e?.toString(),
                errorCode: 'API_CALL_ERROR'
            };
            res.status(500).json(exceptionResponse); 

        }
        else {
            const exceptionResponse: ExceptionResponse = {
                errorMessage: "Something went wrong",
                errorCode: 'API_CALL_ERROR'
            };
            res.status(500).json(exceptionResponse);

        }

    }
});


router.post('/connect', async (req: connectRequest, res: connectResponse) => {
    logger.info('POST: /connect');

})

router.get('/post', async (req: Request, res: Response) => {

    logger.info('GET: /post');
    const body: getPostRequest = req.body
    const response: getPostResponse = await mainService.getPosts(body.jwtToken)

    res.json(response)

})

router.post('/post', async (req: putAPostRequest, res: putAPostResponse) => {
    logger.info('POST: /post');
})

module.exports = router;