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

const facebookService = require('../service/facebook');
const mainService = require('../service/main');

import { Request, Response } from 'express';

router.get('/',async (req: Request,res: Response) => {
    const response = "Welcome to Golu App"
    res.status(200).json(response)
})


router.post('/auth/token', async (req: tokenRequest, res: tokenResponse) => {

});

router.get('/getPlatforms', async (req: Request, res: Response) => {

    const body: getPlatformRequest = req.body
    const response: getPlatformResponse = {
        platformData: [
            {
                platform: 'Facebook',
                isConnected: await facebookService.isConnected(body.jwtToken)
            }
        ]
    }
    res.json(response)
});

router.post('/connect', async (req: connectRequest, res: connectResponse) => {

})

router.get('/post', async (req: Request, res: Response) => {

    const body: getPostRequest = req.body
    const response: getPostResponse = await mainService.getPosts(body.jwtToken)

    res.json(response)

})

router.post('/post', async (req: putAPostRequest, res: putAPostResponse) => {
})

module.exports = router;