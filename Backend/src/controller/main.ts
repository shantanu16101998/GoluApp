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



// Define the routes
router.get('/internal/callback', async (req: {}, res: any) => {

});

router.post('/auth/token', async (req: tokenRequest, res: tokenResponse) => {

});

router.get('/getPlatforms', async (req: getPlatformRequest, res: getPlatformResponse) => {

});

router.post('/connect', async (req: connectRequest, res: connectResponse) => {

})

router.get('/post', async (req: getPostRequest, res: getPostResponse) => {

})

router.post('/post', async (req: putAPostRequest, res: putAPostResponse) => {

})

module.exports = router;