const { Router } = require('express');

const { getGreedyResult } = require('../services/greedy.service');

const router = Router();

router.post('/', (req, res) => {
  const { numberOfJobs } = req.body;
  const orderedJobs = getGreedyResult(numberOfJobs);

  res.send(orderedJobs);
});

module.exports = router;