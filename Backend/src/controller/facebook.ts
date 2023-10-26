const expressFacebook = require('express');
const router = expressFacebook.Router();
import { PagesRequest } from '../dao/facebook';

const facebookService = require('../service/facebook');

router.get('/', async (req: {}, res: any) => {
  facebookService.auth(req, res);
});

router.get('/auth/callback', async (req: any, res: any) => {
  facebookService.authCallback(req, res);
});

router.post('/pages', async (req: any, res: any) => {
  facebookService.getPages(req, res);
});

router.post('/pagesFromUsername', async (req: any, res: any) => {
  facebookService.getPagesFromUserName(req, res);
});

router.post('/post', async (req: any, res: any) => {
  facebookService.postInPage(req, res);
})

module.exports = router;