const { Router } = require('express');

const { getAlgorithmsResults } = require('../services/algorithms.service');

const router = Router();

router.post('/', (req, res) => {
  const result = getAlgorithmsResults(req.body);

  res.send(result);
});

module.exports = router;