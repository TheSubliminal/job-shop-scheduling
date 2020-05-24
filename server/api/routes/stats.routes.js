const { Router } = require('express');

const { getTimeComplexityResults } = require('../services/timeCompexity.service');
const { getJobDurationResults } = require('../services/jobDuration.service');
const { getNumOfJobsResults } = require('../services/numOfJobs.service');
const { getNumOfAntsResults } = require('../services/numOfAnts.service');

const router = Router();

router
  .post('/time-complexity', (req, res) => {
    const result = getTimeComplexityResults(req.body);

    res.send(result);
  })
  .post('/job-duration', (req, res) => {
    const result = getJobDurationResults(req.body);

    res.send(result);
  })
  .post('/num-of-jobs', (req, res) => {
    const result = getNumOfJobsResults(req.body);

    res.send(result);
  })
  .post('/num-of-ants', (req, res) => {
    const result = getNumOfAntsResults(req.body);

    res.send(result);
  });

module.exports = router;