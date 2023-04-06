const router = require('express').Router();
const leaderboardsRouter = require('./leaderboards');

router.use('/leaderboards', leaderboardsRouter);

module.exports = router;
