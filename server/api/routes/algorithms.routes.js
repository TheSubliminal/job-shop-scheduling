const { Router } = require('express');

const { getAlgorithmsResult } = require('../services/algorithms.service');

const router = Router();

router.post('/', (req, res) => {
  const result = getAlgorithmsResult(req.body);

  res.send(result);
});

module.exports = router;