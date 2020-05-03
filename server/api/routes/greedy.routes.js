const { Router } = require('express');

const { getGreedyDelay } = require('../services/greedy.service');

const router = Router();

router.post('/', (req, res) => {
  const { numberOfJobs } = req.body;
  const orderedJobs = getGreedyDelay(numberOfJobs);

  res.send(orderedJobs);
});

module.exports = router;