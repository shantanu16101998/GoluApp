const expressFacebook = require('express');
const router = expressFacebook.Router();

// Import the Facebook service
const facebookService = require('../service/facebook'); // Adjust the path as needed

// Define the routes
router.get('/', async (req : any, res: any) => {
  facebookService.auth(req, res);
});

router.get('/auth/callback', async (req: any, res: any) => {
  facebookService.authCallback(req, res);
});

module.exports = router;