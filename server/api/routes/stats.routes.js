const { Router } = require('express');

const { getTimeComplexityResults } = require('../services/timeCompexity.service');
const { getJobDurationResults } = require('../services/jobDuration.service');


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
    const result = getResult(req.body);

    res.send(result);
  });

module.exports = router;