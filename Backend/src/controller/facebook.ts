const expressFacebook = require('express');
const router = expressFacebook.Router();
import { PagesRequest } from '../dao/facebook';

// Import the Facebook service
const facebookService = require('../service/facebook'); // Adjust the path as needed

// Define the routes
router.get('/', async (req: {}, res: any) => {
  facebookService.auth(req, res);
});

router.get('/auth/callback', async (req: any, res: any) => {
  facebookService.authCallback(req, res);
});

router.post('/pages', async (req: any, res: any) => {
  facebookService.getPages(req, res);
});

router.post('/post', async (req: any, res: any) => {
  facebookService.postInPage(req, res);
})

module.exports = router;